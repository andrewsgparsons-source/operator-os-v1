# Scheduling Protocol v1

## Purpose
Keep tasks moving with clear ownership, timing, and verification.

## Rule 1 — Every task must have 5 fields
`Task | Owner | Cadence | Trigger time | Done signal`

Example:
`MCP cross-read check | James | Daily | 09:00 Europe/London | Post UUID + ✅ connected`

## Rule 2 — Task types
- **One-off:** single execution with due date/time.
- **Recurring:** daily/weekly checks.
- **Event-driven:** run after a specific event (e.g., password rotation).

## Rule 3 — Ownership
- **James:** implementation/execution tasks.
- **Andy:** verification/security cross-check tasks.
- **Andrew:** decisions/approvals.

## Rule 4 — Completion format
Use only one of these in chat:
- `✅ DONE: <task>`
- `❌ BLOCKED: <task> | <reason>`
- `⏭ DEFERRED: <task> | <new date>`

## Rule 5 — Security constraints
- No secrets in chat.
- Secret updates use secure share method only.
- If secret appears in chat: rotate immediately and log incident.

## Rule 6 — Daily operating rhythm (default)
- 09:00 — System health + MCP connectivity check
- 13:00 — Task backlog triage (priorities + blockers)
- 18:00 — End-of-day status summary

## Rule 7 — Weekly operating rhythm (default)
- Monday 09:30 — Weekly plan
- Friday 16:30 — Weekly review and carry-over

## Current Priority Queue (from Andrew)
1. Get Andy full MCP runtime credential verification.
2. Establish protocol for scheduling tasks. (This doc)
3. Work out AI business name.

## Activation format for new tasks
Andrew sends tasks as:
`Task | Owner | Cadence | Time | Notify`
