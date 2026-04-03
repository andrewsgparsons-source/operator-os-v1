# STATE_SNAPSHOT_TEMPLATE

Use this file to capture a reproducible, rollback-safe architecture state.

---

## State Metadata
- **State ID:** `STATE_vN`
- **Date:** `YYYY-MM-DD`
- **Owner:**
- **Environment:** personal / pilot / production
- **Related commit(s):**

## Intent
- What this state is trying to achieve.

## Configuration Summary
- Role topology:
- Execution mode policy:
- Communication pattern:
- Memory backend:
- Secrets method:
- Scheduling profile:

## Key Files
- `docs/AGENTIC_CONFIG_SCHEMA_V0.md`
- `docs/SCHEDULING_PROTOCOL.md`
- `docs/SCHEDULE.md`
- any runtime config paths used

## Verification Results
- Spec gate: PASS/FAIL
- Execution gate: PASS/FAIL
- QA gate: PASS/FAIL
- Approval gate: PASS/FAIL
- Evidence links/IDs:

## Known Risks
1.
2.
3.

## Rollback Plan
- **Rollback target:** `STATE_v(N-1)`
- **Trigger conditions:**
- **Steps:**
  1.
  2.
  3.

## Change Log vs Previous State
- Added:
- Changed:
- Removed:

## Decision Log
- Decision:
- Why:
- Trade-offs:
- Revisit date:
