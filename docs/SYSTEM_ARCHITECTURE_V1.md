# Phone-First AI Operator System — Architecture v1

_Last updated: 2026-04-01_

## Scope
This document defines the v1 architecture for a single-front-door, phone-first AI operator with Dispatch/Deep dual-mode behavior, async job execution, and modular delegate workers.

---

## Design Principles (non-negotiable)
1. **One Front Door** — single user-facing interface agent.
2. **Dual Mode Operation** — Dispatch (default) and Deep (intentional).
3. **Asynchronous by Default** — non-trivial work runs as background jobs.
4. **Context Isolation** — Dispatch jobs are independent unless explicitly Deep.
5. **Cognitive Load Minimization** — short acknowledgements, minimal clarification loops.
6. **Stable Core, Evolving Capabilities** — pluggable tools, swappable models, replaceable workers.
7. **Predictability > Intelligence** — consistent behavior, no surprise verbosity/actions.
8. **Approval Boundaries** — no external side effects without approval.
9. **Base-model behaviour must be measurable, comparable, and non-implicit.**

---

## System Architecture (v1)

```text
[Telegram Interface]
    -> [Operator Core]
    -> [Job Store + Queue]
    -> [Delegate Workers: Writing / Research / Ops]
    -> [Result Store]
    -> [Notifier (completion/failure)]

                         +--------------------------------------+
                         | Cross-Model Behaviour Evaluation Layer |
                         +--------------------------------------+
                               ^ consumes framework-bound suites
                               ^ runs equivalent jobs across models
                               ^ scores, diffs, and role maps models
                               ^ writes behaviour telemetry + reports
```

### Core Components
- **Interface Layer**: Telegram webhook intake + one-line Dispatch acknowledgements.
- **Operator Core**: intent classification, mode detection, context attach, job creation, routing.
- **Job System**: async lifecycle (`queued -> running -> completed/failed`), retry policy, persistence.
- **Execution Layer**: Writing/Research/Ops workers using approved tools in-scope.
- **Memory Layer**: durable storage of jobs/results/events with project/context tags.
- **Results/Notification Layer**: returns completion/failure to user; no queue/start noise.

---

## Cross-Model Behaviour Evaluation Layer

## Purpose
Provide first-class, framework-bound comparison of base model behavior so routing/system design decisions are evidence-based, not implicit.

## Components
1. **Evaluation Harness**
   - Executes equivalent job inputs across selected base models.
   - Holds framework conditions constant:
     - task type
     - mode (Dispatch/Deep)
     - instructions
     - context pack
     - tool availability
   - Captures:
     - raw outputs
     - structured outputs
     - tool usage traces
     - latency
     - errors/retries

2. **Framework-Bound Test Suites**
   - Dispatch intake framework
   - Deep reasoning framework
   - Drafting framework
   - Approval-boundary framework
   - Context-isolation framework

3. **Scoring Engine**
   Scores per run/model on:
   - instruction fidelity
   - mode fidelity
   - clarity vs verbosity
   - correctness
   - uncertainty handling
   - safety compliance
   - approval-boundary adherence
   - context discipline

4. **Differential Analyzer**
   Highlights behavioral deltas (not only scalar scores), e.g.:
   - over-verbosity in Dispatch
   - truth-hierarchy non-compliance
   - hallucination tendencies
   - over-eager action without approval

5. **Model Role Mapper**
   Produces recommendations for:
   - best model for Dispatch mode
   - best model for Deep mode
   - best model per worker role (Writing/Research/Ops)

6. **Regression Runner**
   Re-runs benchmark suites across model/version changes to detect drift.

## Data Flow (internal)
```text
[Benchmark Suite + Fixed Framework Config]
    -> [Evaluation Harness]
    -> [Per-Model Executions]
    -> [Scoring Engine + Differential Analyzer]
    -> [Behaviour Report + Role Mapping]
    -> [Routing Policy Inputs + Architecture Decisions]
```

## Architectural Constraints Compliance
- **Async-first preserved**: evaluation jobs run in background lanes.
- **Context isolation preserved**: each eval run uses fixed independent context packs.
- **Minimal user cognitive load preserved**: layer is internal; no extra front-door complexity.

---

## Observability Model (updated)

In addition to operational traces, persist structured behavior telemetry:
- `eval_run_id`
- framework id/version
- model id/version
- fixed input hash
- output artifacts (raw/structured)
- score vector per dimension
- differential flags
- latency/error metrics

Operational + evaluation logs share traceability through canonical ids.

---

## Evolution & Extensibility Model (updated)

Evaluation outputs become a formal input to evolution decisions:
- model routing updates (Dispatch/Deep/worker mapping)
- framework/prompt policy changes
- safety boundary tuning
- regression gates for model/version upgrades

No critical role should be bound to a model without framework-bound comparison evidence.

---

## Simplicity Guardrail
This layer is intentionally constrained:
- no user-facing complexity increase,
- no replacement of core runtime path,
- no overbuilt experimentation UI in v1,
- focused on measurable, repeatable comparisons that directly inform operations.
- do not degrade system clarity.
- do not leak evaluation subsystem behavior into front-door UX.
- maintain operator-first interaction philosophy.

## Success Criteria (architecture-level)
With this integration, the system must be able to answer, from stored evaluation evidence:
1. Which model is best for Dispatch mode.
2. Which model behaves safest under approval-boundary constraints.
3. Which model degrades under large-context conditions.
4. Whether a model/version update has broken an existing workflow.
5. Whether a framework remains effective independently of model choice.
