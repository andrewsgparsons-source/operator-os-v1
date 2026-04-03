# DELTA_V1_TO_V2

## Purpose
Document what changed from the original founding architecture framing to v2 based on live operation.

## Major Deltas

### 1) Single Front Door clarified as UX default
- **V1 ambiguity:** single front door interpreted as possible single-agent architecture.
- **V2 clarification:** single front door is a user experience rule; tandem collaboration can occur behind the scenes.

### 2) Dual Mode semantics corrected
- **V1 ambiguity:** could be interpreted as system topology mode.
- **V2 clarification:** Dispatch vs Deep are human communication-intent modes.

### 3) Tandem role specialization formalized
- **V2 adds:**
  - James = Delivery Orchestrator / execution
  - Andy = Spec Guardian / QA / security
  - Andrew = Product Owner / acceptance

### 4) Spec-lock control loop introduced
- **V2 adds hard loop:** `SPEC vN -> EXECUTE vN -> QA vN`
- **Rationale:** reduces interpretation drift and chat noise.

### 5) Execution Mode Policy introduced
- **V2 adds policy-driven choice:** `direct_execute` vs `delegate`
- **Rationale:** retain original delegation vision while avoiding routine overhead.

### 6) Collaboration gate model introduced
- **V2 adds:** one visible lead response + internal coordination channel.
- **Backplane:** mCP on Supabase as internal collaboration/memory layer.

### 7) Security tightened by incident learning
- **V2 enforces:** no plaintext secrets in chat; exposure triggers mandatory rotation + incident protocol.

### 8) Architecture state versioning elevated
- **V2 adds:** explicit state snapshots, rollback points, and convergence protocol for parallel drafts.

## Result
V2 preserves founding intent (phone-first, low cognitive load, async-first) while adding operational guardrails learned from real usage.
