#!/usr/bin/env bash
set -euo pipefail

# Lock a definitive Global Configurator release from a state JSON export.
# Usage:
#   ./scripts/lock-global-configurator.sh --state /path/to/export.json [--stamp 2026-04-23-1907]

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT_DIR"

STATE_SRC=""
STAMP=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --state)
      STATE_SRC="${2:-}"
      shift 2
      ;;
    --stamp)
      STAMP="${2:-}"
      shift 2
      ;;
    *)
      echo "Unknown arg: $1" >&2
      exit 1
      ;;
  esac
done

if [[ -z "$STATE_SRC" ]]; then
  echo "Missing required --state <json-file>" >&2
  exit 1
fi

if [[ ! -f "$STATE_SRC" ]]; then
  echo "State file not found: $STATE_SRC" >&2
  exit 1
fi

if [[ -z "$STAMP" ]]; then
  STAMP="$(date +%Y-%m-%d-%H%M)"
fi

LOCK_DIR="prototypes/releases"
mkdir -p "$LOCK_DIR"

LOCK_HTML="$LOCK_DIR/global-configurator-live-$STAMP.html"
LOCK_STATE="$LOCK_DIR/global-configurator-state-$STAMP.json"
LOCK_META="$LOCK_DIR/global-configurator-live.latest.json"

cp "prototypes/global-configurator.html" "$LOCK_HTML"
cp "$STATE_SRC" "$LOCK_STATE"

# Point locked HTML at the co-located locked state file.
node - <<'NODE' "$LOCK_HTML" "$LOCK_STATE"
const fs = require('fs');
const htmlPath = process.argv[2];
const statePath = process.argv[3];
const stateFile = statePath.split('/').pop();
let html = fs.readFileSync(htmlPath, 'utf8');
html = html.replace(/const MAP_DATA_URL\s*=\s*['"][^'"]+['"];?/, `const MAP_DATA_URL = './${stateFile}';`);
fs.writeFileSync(htmlPath, html);
NODE

cat > "$LOCK_META" <<JSON
{
  "lockedAt": "$(date -Iseconds)",
  "sourceHtml": "prototypes/global-configurator.html",
  "sourceState": "${STATE_SRC}",
  "lockedHtml": "${LOCK_HTML}",
  "lockedState": "${LOCK_STATE}"
}
JSON

echo "Created:"
echo "  $LOCK_HTML"
echo "  $LOCK_STATE"
echo "  $LOCK_META"
