# FOUNDER_ARCHITECTURE_SPEC_V2

## 1) TITLE
**Tandem FounderOS v2 — Single Front Door, Tandem Backplane**

## 2) CORE OBJECTIVE
Build a phone-first AI operating layer that turns fast, non-linear founder thinking into reliable action with low cognitive load, while preserving safety, traceability, and iterative control.

## 3) DESIGN PHILOSOPHY
- This system exists to reduce executive friction between thought and execution.
- It is not a chatbot: it is an operating system for decisions, delegation, and follow-through.
- It supports two human cognitive states:
  - **Dispatch:** rapid capture of many unrelated intents.
  - **Deep:** focused co-thinking and refinement.
- Architecture is parametric and versioned: the system is configurable, testable, and rollback-able like engineered product states.

## 4) USER EXPERIENCE MODEL
### Default experience (single front door)
- Human interacts with one visible lead agent response stream.
- Behind the scenes, agents collaborate on shared memory.
- User receives consolidated output, not internal chatter.

### Dispatch experience
- Fast acknowledgement.
- Tasks captured and queued quickly.
- Async completion updates.

### Deep experience
- Slower, higher-fidelity interaction.
- Iterative spec refinement.
- Pass/fail validation loops before acceptance.

## 5) DESIGN PRINCIPLES (NON-NEGOTIABLE)
1. **Single front door by default** (one visible conversational stream).
2. **Dual mode is human-intent mode** (Dispatch vs Deep), not agent-count mode.
3. **Async by default** for non-blocking workflows.
4. **Spec-lock iteration** (`SPEC vN -> EXECUTE vN -> QA vN`).
5. **No mid-cycle spec mutation**; changes become `SPEC vN+1`.
6. **Predictability over cleverness** (deterministic handoff formats).
7. **No plaintext secrets in chat**.
8. **Any secret exposure => immediate rotate + incident logging**.
9. **Version-controlled architecture states** with rollback targets.
10. **Stable core, evolving capabilities** through explicit policy/versioning.

## 6) EXECUTION MODES
### Dispatch Mode
- Behavior: rapid intake, triage, queueing, delegation.
- Constraints: minimal interruption, concise acknowledgements, no deep branching unless requested.
- Response style: short receipts + async completion signals.

### Deep Mode
- Behavior: focused discussion, spec convergence, iterative QA.
- When used: design, architecture, analysis, validation-heavy tasks.
- Pattern: explicit versioned loops and acceptance criteria.

## 7) SYSTEM ARCHITECTURE (V2)
### Interface Layer
- Telegram (or equivalent) as control cockpit.
- Single lead response stream to user by default.

### Operator Core
- Role policy engine selecting execution mode and handoff pattern.
- Ownership matrix: Product Owner (human), Delivery Orchestrator, Spec Guardian/QA.

### Job System
- Normalized job objects with lifecycle and status signals.

### Dispatcher / Queue
- Dispatch-mode intake queue.
- Prioritization and async routing.

### Delegate Workers
- Optional specialist agents for long-running/complex tasks.
- Used policy-first, not by habit.

### Tool Layer
- Tool invocations with explicit approvals for high-risk actions.

### Memory Layer
- **mCP on Supabase** as shared coordination/memory backplane.
- Used for handoffs, deltas, and cross-agent state.

### Notification Layer
- Completion and blocker signals (`✅ DONE`, `❌ BLOCKED`, `⏭ DEFERRED`).

## 8) JOB MODEL
### Taxonomy
- `DRAFT`, `RESEARCH`, `CHECK`, `STORE`, `NOTIFY`, `PLAN`, `EVOLVE`

### Lifecycle
`created -> queued -> running -> (done | blocked | deferred)`

### Retry logic
- Retry transient failures with bounded attempts.
- Escalate with blocker reason when deterministic failure persists.

### Async model
- Default non-blocking execution.
- User receives concise progress and completion signals.

## 9) CONTEXT & MEMORY MODEL
- Context isolation by task/thread unless explicit cross-link.
- Project-bound artifacts in repo docs.
- Truth hierarchy:
  1. Locked `SPEC vN` (authoritative for iteration)
  2. Decision logs
  3. Latest validated outputs
  4. Raw conversational inputs
- Persistence expectation: key decisions and state snapshots are durable in version control.

## 10) APPROVAL & SAFETY MODEL
### Requires explicit approval
- External side effects (public sends, account changes, destructive actions).
- Security posture changes and sensitive config rewrites.

### Allowed autonomously
- Internal drafting, analysis, local documentation, non-destructive checks.

### Constraints
- No secret disclosure in chat.
- Minimize external blast radius.

## 11) OBSERVABILITY MODEL
- Every cycle must expose:
  - spec version used,
  - execution artifacts/IDs,
  - QA pass/fail + deltas,
  - final decision.
- Traceability anchored in repo docs + state snapshots.

## 12) TESTING & EVALUATION PHILOSOPHY
- **Behavioral correctness:** did output match locked spec?
- **Cognitive load:** did user manage with one front door and clear states?
- **Latency:** dispatch ack speed + completion timeliness.
- **Real-world fitness:** outcomes in live workflows (e.g., shed configurator iterations).

## 13) EVOLUTION & EXTENSIBILITY MODEL
### Stable core
- Single front door UX
- Dual human-intent modes
- Spec/QA control loop
- Safety/secret rules

### Evolving components
- Specialist agents
- Tool integrations
- Scheduling profiles
- Validation automation

### Drift prevention
- Versioned architecture states (`STATE_vN`)
- Change logs and rollback plans
- Explicit convergence protocol for parallel drafts

### EVOLVE job role
- Capture lessons, propose controlled architecture changes, and produce upgrade deltas.

## 14) MVP DEFINITION
### V1 success criteria
- Single front-door interaction stable.
- Dispatch + Deep modes operational.
- `SPEC vN -> EXECUTE vN -> QA vN` loop running in production workflows.
- mCP shared memory supports behind-the-scenes coordination.
- Security SOP enforced (no plaintext secrets in chat).

### Intentionally excluded for MVP
- Full autonomous multi-agent visible conversation by default.
- Advanced policy automation beyond current manual gates.

## 15) OPEN QUESTIONS / FUTURE CONSIDERATIONS
1. When to surface second agent visibly without increasing cognitive load?
2. How much execution should be delegated by default vs direct execution?
3. Best long-term secret distribution stack for multi-runtime operations.
4. How to productize parameter presets for different user personas.
5. How to package architecture snapshots as deployable templates.

---

## OPERATING THESIS
From a parametric shed configurator to a **parametric agentic architecture configurator**:
- same mindset,
- same versioning discipline,
- same iterative convergence,
- higher leverage domain.
