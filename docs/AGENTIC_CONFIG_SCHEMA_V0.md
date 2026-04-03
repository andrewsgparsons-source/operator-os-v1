# AGENTIC_CONFIG_SCHEMA_V0

## Purpose
Define a parametric configuration model for agentic architectures so systems can be designed, versioned, validated, and rolled back like engineered products.

## Core Design Principles
1. **Parametric over ad-hoc** — systems are composed from explicit, selectable parameters.
2. **Stateful versioning** — each accepted config is a named, reproducible state.
3. **Verification-gated** — deployment changes require explicit pass/fail checks.
4. **Rollback-ready** — every state includes a known-good restore path.

---

## Schema (v0)

### 1) Identity
- `system_name` (string)
- `state_version` (string; e.g., `STATE_v3`)
- `owner` (string)
- `environment` (enum: `personal`, `pilot`, `production`)

### 2) Role Topology
- `roles` (array):
  - `product_owner` (human)
  - `delivery_orchestrator` (agent)
  - `spec_guardian_qa` (agent)
  - optional specialist agents
- `ownership_matrix`:
  - decision owner
  - execution owner
  - validation owner

### 3) Execution Mode Policy
- `default_mode` (enum: `direct_execute`, `delegate`)
- `mode_selection_rules` (array):
  - expected runtime threshold
  - complexity threshold
  - specialist tooling/model need
  - parallel branch benefit

### 4) Communication Pattern
- `response_style` (enum: `single_unified`, `dual_stream`)
- `handoff_format` (template ref)
- `completion_signals`:
  - `✅ DONE`
  - `❌ BLOCKED`
  - `⏭ DEFERRED`

### 5) Memory Layer
- `memory_backend` (enum: `local_files`, `shared_file`, `postgres_supabase`, `hybrid`)
- `memory_scope` (enum: `session`, `global`, `role_scoped`)
- `sync_rules` (e.g., indexing cadence, conflict behavior)

### 6) Secrets & Security
- `secret_distribution_method` (enum: `password_manager`, `one_time_encrypted_link`)
- `secret_incident_policy` (rotate-on-exposure: boolean)
- `chat_secret_policy` (must be `no_plaintext`)
- `verification_required` (boolean)

### 7) Scheduling & Operations
- `cadence_profile`:
  - daily health check
  - backlog triage
  - end-of-day summary
- `scheduler_source` (path to SCHEDULE.md)
- `notification_channel` (telegram/chat/etc.)

### 8) Validation Gates
- `spec_gate` (SPEC vN required)
- `execution_gate` (artifact/link produced)
- `qa_gate` (PASS/FAIL + delta)
- `approval_gate` (human approval required)

### 9) Rollback
- `rollback_target_state`
- `rollback_trigger_conditions`
- `rollback_steps`

---

## Minimal Example (YAML style)
```yaml
system_name: Tandem Pilot
state_version: STATE_v1
owner: Andrew
environment: personal
roles:
  - product_owner
  - delivery_orchestrator
  - spec_guardian_qa
execution_mode:
  default_mode: direct_execute
  mode_selection_rules:
    - if_expected_runtime_minutes_gt: 15
      then: delegate
communication:
  response_style: single_unified
memory:
  backend: postgres_supabase
security:
  secret_distribution_method: password_manager
  chat_secret_policy: no_plaintext
validation:
  spec_gate: required
  qa_gate: required
```

## v1 Upgrade Candidates
- risk scoring per task
- auto mode-selection policy engine
- config linter + preflight checks
- explicit cost/latency budget parameters
