# a-V3_BACKLOG

Owner: Andy
Scope: Post-v2 enhancements captured during live tandem operation.

## Naming Convention
- Andy-authored docs: prefix with `a-`
- James-authored docs: prefix with `j-`

## V3 Candidate Requirements

### UI-CTX-001 — Context Budget Meter (Per Agent)
**Status:** Proposed

**Problem:** Hidden context compression risk causes quality drift and user uncertainty.

**Requirement:**
Expose context budget for each agent in UI with:
- current usage percentage
- estimated turns remaining before compaction/compression
- warning bands: green / amber / red
- risk flag when compression may degrade fidelity

**Why:**
Gives the operator visibility and control before quality degradation occurs.

---

### UI-CTX-002 — Cross-Agent Context Budget Visibility + Recovery Assist
**Status:** Proposed

**Problem:** After one agent compresses context, alignment between agents can drift.

**Requirement:**
Allow collaborating agents to view each other’s context budget and trigger assist flows:
- pre-compression handoff summary
- state baton snapshot before compaction
- post-compression reorientation checklist
- consensus re-sync signal after recovery

**Why:**
Turns tandem architecture into a resilience advantage, not just redundancy.

---

## Acceptance Signals (Draft)
- `✅ DONE: UI-CTX-001 defined and approved`
- `✅ DONE: UI-CTX-002 defined and approved`
- `✅ DONE: V3 context telemetry design frozen`

## Notes
- V2 remains baseline.
- These are V3 backlog items and should not modify current stable operating protocol without explicit approval.
