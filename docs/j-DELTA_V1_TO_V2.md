# Delta: V1 → V2 Architecture
## What Changed and Why

**Date:** 2026-04-03  
**Author:** James  
**Purpose:** Document evolution from single-agent async system to dual-agent parametric system

---

## Major Architectural Changes

### 1. Single Agent → Dual Agent Team

**V1:**
- One agent, all roles
- Job queue for async execution
- Phone-first interface

**V2:**
- Two agents: Executor (James) + Spec Guardian/QA (Andy)
- Role specialization emerged organically
- Multi-channel (Telegram primary)

**Why:**
- Role separation improves quality (spec → execute → QA)
- Parallel perspectives catch issues early
- Security enforcement more effective with dedicated guardian
- BUT: Requires coordination layer (MCP)

**Trade-off:**
- Added complexity (two agents to coordinate)
- Higher cognitive load if both visible (mitigated by single front door UX)

---

### 2. Pure Async → Hybrid (Direct + Delegate)

**V1:**
- All tasks → async job queue
- Main agent always available (never blocks)

**V2:**
- Routine tasks (<10min): Direct execute
- Complex tasks (>10min): Delegate to specialist
- Main agent chooses mode based on task class

**Why:**
- Real-world testing showed delegation overhead
- Routine "bread and butter" tasks faster direct
- Specialist agents need better training/context
- Hybrid keeps main agent available while optimizing speed

**Trade-off:**
- More complex routing logic
- Need clear decision thresholds
- Risk: main agent going "heads down" on long tasks

---

### 3. Job Taxonomy → SPEC vN Workflow

**V1:**
- Job types: DRAFT, RESEARCH, CHECK, STORE, NOTIFY, PLAN, EVOLVE
- Job lifecycle: submit → queue → execute → notify

**V2:**
- SPEC vN workflow: intent → locked spec → execute → QA → pass/fail
- Version-controlled specs eliminate interpretation drift
- QA gate before delivery

**Why:**
- Real-world iteration revealed interpretation drift problem
- Fuzzy descriptions → multiple failed attempts
- Locked specs = single source of truth
- Faster convergence (delta to vN+1, not freeform edits)

**Trade-off:**
- Overhead of spec locking step
- Requires spec guardian agent (Andy)
- BUT: Massive reduction in rework cycles

---

### 4. Simple Memory → Layered Memory + MCP

**V1:**
- Daily logs
- Long-term memory (single file)
- Context isolation per task

**V2:**
- Daily logs: `memory/YYYY-MM-DD.md`
- Long-term: `MEMORY.md` (main session only - privacy)
- Shared memory: MCP/Supabase (cross-agent coordination)
- Architecture memory: Version-controlled configs

**Why:**
- Multi-agent needs coordination layer
- Privacy separation (main session vs shared contexts)
- Architecture configs need versioning (reboot capability)

**Trade-off:**
- More complex memory hierarchy
- MCP dependency (Andy connection pending)
- Storage overhead

---

### 5. No Versioning → Parametric Configuration

**V1:**
- System architecture undefined
- No version control of configs
- No rollback capability

**V2:**
- Version-controlled agent team configs (JSON snapshots)
- Git as state management
- Stable checkpoints tagged
- Failed experiments documented + reverted

**Why:**
- Real-world evolution showed need for "reboot points"
- Architecture changes broke workflows
- Need to experiment safely
- Parametric vision: configure agent teams like shed designs

**Trade-off:**
- Discipline required (commit configs, tag checkpoints)
- Git knowledge needed
- BUT: Enables safe experimentation and scale

---

## New Concepts in V2

### Single Front Door (UX Layer)

**NEW:** User has one conversation partner by default
- Reduces cognitive load (not seeing dual-agent chatter)
- Agents coordinate behind scenes via MCP
- Optional: "bring Andy into conversation" with rules

**Why Added:**
- Real testing showed dual-agent chat doubles cognitive load
- Coordination bottleneck when Andrew manually relays messages
- Solution: MCP backend coordination, consolidated frontend

---

### Dual Mode = Human Intent (Not Agent Count)

**NEW:** Dispatch vs Deep mode determined by USER state
- **Dispatch:** Rapid task firing, aggressive delegation
- **Deep:** Focused iteration, can work directly

**Why Clarified:**
- Confusion between "dual agents" and "dual mode"
- Mode is about human cognitive state, not system topology
- System adapts to user's mode

---

### SPEC vN Workflow

**NEW:** Locked specification versioning
1. User describes intent
2. Spec guardian locks testable spec vN
3. Executor builds to exact spec
4. QA validates: pass → deliver, fail → delta to vN+1

**Why Added:**
- Interpretation drift caused multiple failed iterations
- Fuzzy requirements → wrong outputs
- Locked spec = accountability + auditability

---

### Execution Mode Policy

**NEW:** Clear decision logic for direct vs delegate
- Delegate if: >10-15min OR specialist tooling OR parallel OR exploration
- Otherwise: Direct execute

**Why Added:**
- V1 "always delegate" created overhead
- Need balance: availability vs speed
- Hybrid emerged from real-world testing

---

### Architecture Memory

**NEW:** System remembers its own evolution
- `ARCHITECTURE_CHANGELOG.md`
- Config snapshots in `architecture-configs/vN.json`
- Git commits with rationale
- Failed experiments documented

**Why Added:**
- Learning from mistakes requires memory
- Patterns library (what worked)
- Avoid repeating failures
- Enable "reboot to stable state"

---

## What Stayed the Same

### Core Principles (Preserved)

- ✅ Async-first (don't block user)
- ✅ Minimal cognitive load
- ✅ Predictability over cleverness
- ✅ Context isolation
- ✅ Stable core / evolving periphery

### User Experience Goals

- ✅ Rapid capture (dispatch mode)
- ✅ Deep co-thinking (deep mode)
- ✅ Always available
- ✅ Clear acknowledgment
- ✅ Async results + notifications

---

## Lessons Learned (V1 → V2)

### 1. Delegation Isn't Free
- Sub-agents need context, training, clear specs
- Overhead can exceed direct execution time
- Hybrid model better than "always delegate"

### 2. Role Specialization Emerges
- Didn't prescribe Andy as spec guardian
- Observed natural gravitation during workflows
- Formalized what worked organically

### 3. Parallel Work Needs Convergence
- Two agents drafting → valuable options
- BUT: Need structured merge process
- Ad-hoc discussion doesn't scale

### 4. Single Front Door Critical
- Dual-agent chat = cognitive overload
- User needs one conversation partner
- Coordination happens behind scenes

### 5. Version Everything
- Configs, specs, decisions, states
- Git = time machine for architecture
- Failed experiments recoverable

### 6. Security Hard
- Knowing rules ≠ following them
- Documentation insufficient
- Need enforcement (technical + behavioral)

---

## Migration Path (If Deploying V1 → V2)

### Step 1: Add Spec Guardian Agent
- Introduce Andy (or equivalent)
- Define role: spec locking + QA
- Set up MCP coordination layer

### Step 2: Implement SPEC vN Workflow
- Template for locked specs
- QA checklist
- Delta process for failures

### Step 3: Configure Execution Modes
- Define direct execute threshold
- Train specialist agents (if delegating)
- Routing logic

### Step 4: Version Control Architecture
- Create config snapshots
- Tag stable checkpoints
- Document changes in changelog

### Step 5: Test Hybrid Workflows
- Real tasks (not synthetic)
- Measure: iteration count, time to delivery
- Refine thresholds

---

## Open Questions for V3

1. **Optimal delegation threshold?**
   - Current: >10-15min or complex
   - Need real data to validate

2. **Convergence protocol?**
   - How do parallel drafts merge?
   - Who owns final decision?

3. **Parametric deployment?**
   - How to configure custom teams?
   - Template library vs wizard?

4. **Scaling multi-agent?**
   - 2 agents works, what about 3+?
   - Coordination complexity?

5. **MCP as sole coordination?**
   - Fallback if unavailable?
   - Real-time vs async trade-offs?

---

## Summary

**V1 → V2 represents shift from:**
- "Single AI assistant" → "Coordinated AI team"
- "One-size-fits-all" → "Parametric configuration"
- "Fixed architecture" → "Version-controlled evolution"

**Core insight:**
We're building a parametric configurator FOR agentic architecture — using ourselves as the test case.

**Next milestone:**
Converge James + Andy versions → final locked V2 spec → tag stable checkpoint → deploy to production (Andrew's daily use)

---

**Status:** DRAFT for convergence  
**Convergence Partner:** Andy's DELTA_V1_TO_V2.md  
**Approval Required:** Andrew (after merge)
