# Global Configurator — Lock Workflow (Source of Truth)

This workflow creates a **frozen, reproducible release** from your current in-browser map state.

## Why

`prototypes/global-configurator.html` is the rolling app shell.

To lock a definitive version, we need both:
1. The app HTML at that moment
2. The exact exported state JSON

## Standard Flow

1) In Global Configurator, go to **Save** tab.
2) Set **Export scope = Option 2 (Everything)**.
3) Export JSON and save it into repo, e.g.:
   - `prototypes/data/snapshots/global-configurator-state-YYYY-MM-DD-HHMM.json`
4) Run:

```bash
./scripts/lock-global-configurator.sh \
  --state prototypes/data/snapshots/global-configurator-state-YYYY-MM-DD-HHMM.json
```

(Optional explicit stamp)

```bash
./scripts/lock-global-configurator.sh \
  --state prototypes/data/snapshots/global-configurator-state-YYYY-MM-DD-HHMM.json \
  --stamp YYYY-MM-DD-HHMM
```

5) Commit + push `main`, then sync same files to `gh-pages`.

## What gets generated

Under `prototypes/releases/`:
- `global-configurator-live-<stamp>.html`
- `global-configurator-state-<stamp>.json`
- `global-configurator-live.latest.json` (pointer/manifest)

The locked HTML is rewritten to load the co-located locked state JSON.

## Result

A URL like:

`https://andrewsgparsons-source.github.io/operator-os-v1/prototypes/releases/global-configurator-live-<stamp>.html`

is now a true frozen source-of-truth release (until intentionally replaced by a newer lock).