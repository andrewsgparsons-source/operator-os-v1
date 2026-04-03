# CASE_STUDY_001_SHED_WORKFLOW

## Title
Reverse-pent partitioned shed: dual-agent execution + QA loop.

## Objective
Validate tandem workflow for converting natural-language requirements into a working configurator output with reduced drift.

## Team Roles
- **Andrew:** Product Owner (intent + acceptance)
- **James:** Delivery Orchestrator (execution)
- **Andy:** Spec Guardian / QA (normalization + drift checks)

## Initial Requirement (condensed)
- Reverse pent shed
- Partitioned into two rooms
- Distinct room-specific door/window layouts
- Door placement on low side / specific wall designation

## Friction Observed
1. Requirement ambiguity around axis/orientation and slope direction.
2. Drift in opening placement (doors/windows appearing on wrong wall).
3. Iteration overhead from mixed commentary + execution responses.
4. Secret-handling interruptions affected operational focus.

## What Improved
1. Spec lock pattern (`SPEC vN`) reduced interpretation drift.
2. QA-focused review caught geometry/opening mismatch quickly.
3. Explicit role split (execute vs validate) increased clarity.

## Key Insight
A tandem system performs best when:
- execution mode is policy-driven (`direct_execute` vs `delegate`),
- output is validated against a locked spec,
- iteration changes are diff-only into `SPEC vN+1`.

## Proposed Operating Loop
1. Andrew updates requirement.
2. Andy publishes `SPEC vN`.
3. James executes `SPEC vN`.
4. Andy returns `QA vN` PASS/FAIL + deltas.
5. Andrew approves close or next iteration.

## Acceptance Criteria for Future Similar Jobs
- Wall/roof orientation explicitly declared in spec.
- Opening placements bound to named wall IDs, not narrative only.
- Eaves heights explicitly included when relevant.
- Output includes parameter dump + configurator link.

## Artifacts to Capture Next Iteration
- `SPEC_vN` text block
- generated build/link ID
- parameter dump
- QA delta list
- approved final state snapshot

## Business Relevance
This case supports the thesis of a **parametric configurator for agentic architecture**:
- formal parameters,
- controlled state transitions,
- reproducible delivery,
- rollback safety.
