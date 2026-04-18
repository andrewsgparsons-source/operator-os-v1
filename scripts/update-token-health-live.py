#!/usr/bin/env python3
import json
from pathlib import Path
from datetime import datetime, timedelta, timezone

SESSIONS_DIR = Path('/home/andy/.openclaw/agents/main/sessions')
OUT = Path('/home/andy/.openclaw/workspace/operator-os-v1/prototypes/assets/token-health-live.json')

now = datetime.now(timezone.utc)
cut_24h = now - timedelta(hours=24)
cut_30d = now - timedelta(days=30)


def parse_ts(s):
    try:
        return datetime.fromisoformat(s.replace('Z', '+00:00'))
    except Exception:
        return None


def file_usage(path):
    total_24h = 0
    calls_24h = 0
    total_30d = 0
    calls_30d = 0
    latest = None

    with path.open() as f:
        for line in f:
            try:
                o = json.loads(line)
            except Exception:
                continue
            if o.get('type') != 'message':
                continue
            m = o.get('message') or {}
            u = m.get('usage') or {}
            t = u.get('totalTokens')
            ts = parse_ts(o.get('timestamp', ''))
            if ts is None or t is None:
                continue
            if latest is None or ts > latest:
                latest = ts
            if ts >= cut_24h:
                total_24h += int(t)
                calls_24h += 1
            if ts >= cut_30d:
                total_30d += int(t)
                calls_30d += 1

    return {
        'latest': latest,
        'total_24h': total_24h,
        'calls_24h': calls_24h,
        'total_30d': total_30d,
        'calls_30d': calls_30d,
    }


rows = []
for p in SESSIONS_DIR.glob('*.jsonl'):
    u = file_usage(p)
    if u['latest'] is None:
        continue
    rows.append((p, u))

rows.sort(key=lambda x: x[1]['latest'], reverse=True)

main = rows[0][1] if rows else {'total_24h': 0, 'calls_24h': 0, 'total_30d': 0, 'calls_30d': 0}
others = rows[1:] if len(rows) > 1 else []
other_24h = sum(r[1]['total_24h'] for r in others)
other_calls_24h = sum(r[1]['calls_24h'] for r in others)
all_30d = sum(r[1]['total_30d'] for r in rows)
all_calls_30d = sum(r[1]['calls_30d'] for r in rows)

payload = {
    'thresholds': {'warn': 70, 'high': 85, 'critical': 95},
    'source': {
        'mode': 'live',
        'updatedAt': now.isoformat(),
        'note': 'Computed from local OpenClaw session JSONL logs'
    },
    'windows': [
        {
            'id': 'w1',
            'label': 'Main session (24h)',
            'used': main['total_24h'],
            'limit': 5000000,
            'apiCalls': main['calls_24h'],
            'relatedNodeIds': ['agent_main']
        },
        {
            'id': 'w2',
            'label': 'Other sessions (24h)',
            'used': other_24h,
            'limit': 5000000,
            'apiCalls': other_calls_24h,
            'relatedNodeIds': ['agent_spawn']
        },
        {
            'id': 'w3',
            'label': 'Model/API rolling 30d',
            'used': all_30d,
            'limit': 200000000,
            'apiCalls': all_calls_30d,
            'relatedNodeIds': ['model_api', 'policy_gate']
        }
    ]
}

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(json.dumps(payload, indent=2))
print(f'Wrote {OUT}')
