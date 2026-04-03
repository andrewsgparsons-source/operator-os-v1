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

### AGENT-AWARE-001 — Runtime Self-Awareness Panel
**Status:** Proposed

**Requirement:**
Expose per-agent runtime introspection in-session:
- machine/runtime ID
- OS/shell context
- OpenClaw version
- active repo path
- config source-of-truth path
- channel/session binding
- memory backend connectivity

---

### AGENT-AWARE-002 — Peer Awareness Capability Card
**Status:** Proposed

**Requirement:**
Expose minimal peer cards for collaborating agents:
- agent ID + role
- runtime location class (local/remote)
- tool profile summary
- shared-memory connectivity state
- last sync timestamp

---

### AGENT-AWARE-003 — Awareness Policy Levels (Parametric)
**Status:** Proposed

**Requirement:**
Support configurable awareness depth by context:
- Minimal
- Operational
- Full

**Design intent:** maximize coordination reliability while preserving least-information security.

## Acceptance Signals (Draft)
- `✅ DONE: UI-CTX-001 defined and approved`
- `✅ DONE: UI-CTX-002 defined and approved`
- `✅ DONE: AGENT-AWARE-001 defined and approved`
- `✅ DONE: AGENT-AWARE-002 defined and approved`
- `✅ DONE: AGENT-AWARE-003 defined and approved`
- `✅ DONE: V3 context telemetry design frozen`

## Notes
- V2 remains baseline.
- These are V3 backlog items and should not modify current stable operating protocol without explicit approval.
