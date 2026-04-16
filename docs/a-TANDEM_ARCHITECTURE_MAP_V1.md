# a-TANDEM_ARCHITECTURE_MAP_V1

**Author:** Andy  
**Date:** 2026-04-16  
**Scope:** Consolidated map of progress across chat + repo work + video-driven insights for Tandem agentic architecture.

---

## 1) Mission
Build a phone-first, low-cognitive-load operator system where:
- Andrew gets one clean front-door interaction,
- James + Andy coordinate behind the scenes,
- architecture is versioned like product states,
- delivery follows a strict spec/execute/qa loop,
- security and drift control are explicit and enforced.

---

## 2) Core Architecture Decisions (Locked)

1. **Single Front Door UX (default)**
   - One visible stream to reduce cognitive overhead.
   - Multi-agent visibility is optional and policy-controlled.

2. **Role Split (operationally validated)**
   - Andrew = Product Owner / Approver
   - James = Delivery Orchestrator / Execution
   - Andy = Spec Guardian / QA / Security

3. **Dual Interaction Modes**
   - **Dispatch:** fast capture + async delegation
   - **Deep:** iterative co-thinking + controlled loops

4. **Control Loop**
   - `SPEC vN -> EXECUTE vN -> QA vN -> APPROVE or DELTA -> SPEC vN+1`
   - No mid-cycle freeform spec mutation.

5. **Policy for execution**
   - direct execute for routine/short tasks
   - delegate for complex/parallel/high-uncertainty tasks.

---

## 3) What We Built / Proved

### 3.1 Coordination + Memory
- Confirmed practical mCP/Supabase coordination path exists.
- Andy-side read verification succeeded (memory rows + UI hits confirmed).
- Clarified current state: setup exists, but fully seamless hands-off cross-agent routine still needs hardening.

### 3.2 Security + Ops Hardening
- Security baseline checks executed.
- Gateway trusted proxies hardened to loopback-only.
- Repeated incidents reinforced strict SOP: **no plaintext secrets in chat; rotate immediately on exposure.**

### 3.3 Documentation + Versioning
- V2 architecture docs authored and pushed.
- Prefix convention enforced:
  - Andy docs: `a-*`
  - James docs: `j-*`
- Added Andy-prefixed copies for key V2 docs.
- Added Andy podcast narrative doc.
- Scheduling protocol/docs added in repo.

### 3.4 Productization Step
- Built and pushed working GUI prototype:
  - `prototypes/a-parametric-configurator-v0.html`
- Prototype includes topology/policy/memory-security/gates, live diagram, JSON output, deploy checklist.

---

## 4) Canonical Repo Artifacts (Andy stream)

- `docs/a-FOUNDER_ARCHITECTURE_SPEC_V2.md`
- `docs/a-DELTA_V1_TO_V2.md`
- `docs/a-V3_BACKLOG.md`
- `docs/a-V3_AGENT_AWARENESS_NOTES.md`
- `docs/a-PODCAST_3_DAYS_OF_TANDEM.md`
- `prototypes/a-parametric-configurator-v0.html`

---

## 5) Key Lessons from Execution Reality

1. **Shared tools != shared visibility**
   - Telegram group does not guarantee reliable cross-agent context visibility.
   - Needs explicit relay or shared memory coordination.

2. **Friction reveals requirements**
   - SSL/connectivity/script errors directly exposed missing operational contracts.

3. **Determinism requires discipline, not vibes**
   - Drift reduced when we lock SPEC and run pass/fail QA gates.

4. **Temporary duplication is okay**
   - Parallel `a-` and `j-` drafts improve coverage.
   - Convergence step remains mandatory.

5. **Mobile-first communication constraints are real**
   - Keep instructions copy-paste clean and operationally explicit.

---

## 6) Video Intelligence Map (from links shared in this chat)

> Note: Access to full playback/transcript is sometimes limited by runtime/YT anti-bot gates. Titles/metadata were identified where possible; actionable themes below are conservative and aligned to repeated patterns across the set.

### A) Identified videos
- `sboNwYmH3AY` — *Andrej Karpathy Just 10x’d Everyone’s Claude Code*
- `wc8FBhQtdsA` — *An AI state of the union: We’ve passed the inflection point & dark factories are coming*
- `WlDhN2bm3SU` — *OpenClaw 4.12 update is actually incredible*
- `fkT41ooKBuY` — *I cut my OpenClaw API bill by 80% with one config change*
- `2PWJu6uAaoU` — *The Real Problem With AI Agents Nobody's Talking About*
- plus additional queued links shared earlier (pending full extraction).

### B) Repeated high-value themes (cross-video)
1. **Cost control is architecture, not just model choice**
   - Tiering, routing, and context policy drive most savings.
2. **Agent reliability bottleneck = drift + weak test gates**
   - Need regression/baseline checks, not only prompting tweaks.
3. **Memory quality > memory quantity**
   - Structured state snapshots + reorientation protocol matter.
4. **Orchestration policy beats raw agent count**
   - More agents without role clarity increases noise.
5. **Operational observability is mandatory**
   - Context budget, compression events, and handoff traces should be first-class.

### C) Immediate apply/ignore matrix
- **Apply now**
  - Red/Green drift gate for every parametric execution cycle.
  - Cost-routing policy by task class.
  - Structured state snapshots before/after compression.
- **Test next**
  - Awareness levels (minimal/operational/full) by context.
  - Auto-escalation thresholds for direct vs delegate.
- **Ignore/hype**
  - Claims that “more autonomous agents” alone solves quality.
  - Generic “just use model X” prescriptions without governance + QA loop.

---

## 7) Drift-Control Prompt (Operational)

Use with execution agent each cycle:

**"Run strict RED→GREEN gate: RED = diff current output against locked SPEC_vN and list all drift; GREEN only when output matches exactly (or only approved deltas), otherwise do not proceed."**

Minimum 3 checks when moving fast:
1) dimensions,
2) openings/walls placement,
3) orientation/roof slope.

---

## 8) Current Gaps

1. Fully seamless two-agent mCP routine (write/read/ack) still not fully normalized.
2. Final merged V2 (single converged spec) still pending.
3. Video intelligence is not yet normalized into one canonical shared table with status (`captured -> validated -> applied`).

---

## 9) Next 7-Day Plan

1. Create/maintain `docs/VIDEO_INTEL_MAP.md` (shared canonical).
2. Backfill all shared links with: key claim, confidence, apply/test/ignore status.
3. Add V3 backlog items from video evidence only when tied to concrete tests.
4. Run one convergence pass across `a-` + `j-` V2 into final merged spec.
5. Enforce RED→GREEN gate in all shed/parametric execution cycles.

---

## 10) One-line state summary

We have moved from ad-hoc multi-agent experimentation to a versioned, role-separated, policy-driven tandem architecture with working artifacts, proven partial shared-memory coordination, and a clear path to reliability/cost improvements via stricter drift gates and observability.
