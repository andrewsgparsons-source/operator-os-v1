# TandemAI: Parametric Agentic Architecture System
## Founding Architecture Specification v2.0

**Date:** 2026-04-03  
**Author:** James (Main Agent)  
**Status:** DRAFT - Parallel version for convergence  
**Convergence Target:** Final unified spec with Andy's version

---

## 1. TITLE

**TandemAI: Parametric Multi-Agent Operating System**

A version-controlled, parametrically-configurable dual-agent system for personal and business task orchestration.

---

## 2. CORE OBJECTIVE

**Fundamental Problem:**
Current AI assistants provide either a single general-purpose agent (cognitive overload, jack-of-all-trades) OR complex multi-agent systems (noisy, uncoordinated, chaos).

**TandemAI solves:**
- Intelligent task orchestration with role specialization
- Low cognitive load interface (single front door)
- Behind-the-scenes collaboration without chat noise
- Version-controlled architecture states (reboot on failure)
- Parametric configuration (deploy custom agent teams)

**Core Value:**
Transform from "AI assistant" to "AI operating system" - a coordinated team that matches human cognitive patterns (dispatch vs deep mode) while maintaining availability and reliability.

---

## 3. DESIGN PHILOSOPHY

### Why This System Exists

Humans think non-linearly and operate in multiple cognitive modes:
- **Dispatch mode:** Rapid capture, brain dump, fire-and-forget tasks
- **Deep mode:** Focused iteration, co-thinking, refinement

Current AI systems force one interaction pattern. TandemAI adapts to the human's mode.

### What Makes It Different

**NOT a chatbot:** A coordinated operating layer with:
- Role specialization (executor vs spec guardian vs security)
- Version-controlled team configurations
- State snapshots and reboot points
- Parametric deployment (configure once, deploy many)

**NOT a multi-agent free-for-all:** Structured collaboration:
- Single front door (one conversation partner)
- Behind-scenes coordination (MCP shared memory)
- Locked specs eliminate interpretation drift
- QA gates before delivery

### Cognitive Model Supported

**Human as orchestrator:**
- Describes intent (natural language)
- Receives consolidated output (one response)
- Can query collaboration layer (optional transparency)

**Agents as team:**
- Spec guardian converts intent → testable spec
- Executor builds against locked spec
- QA validates before delivery
- Security enforces protocols

**System as parametric platform:**
- Configuration = parameters (like shed width/depth)
- Deploy custom teams for different use cases
- Version control = time travel for architecture

---

## 4. USER EXPERIENCE MODEL

### Dispatch Mode (Rapid Capture)

**Behavior:**
```
User: "Draft email to supplier, check weather, remind me about meeting"
System: ✓ Acknowledged (3 tasks queued)
  [Tasks execute in background]
  [Notifications arrive when complete]
```

**Characteristics:**
- Instant acknowledgment (always available)
- Aggressive delegation (stay responsive)
- Async results (don't block)
- Context isolation (tasks don't interfere)

### Deep Mode (Co-Thinking)

**Behavior:**
```
User: "I need a shed configurator link for a customer"
System: [Clarifying questions, spec refinement, iteration]
User: "The roof is sloping the wrong way"
System: [Builds corrected version, visual verification]
```

**Characteristics:**
- Synchronous dialogue
- Iterative refinement
- Can do work directly (fast turnaround)
- Or delegate to specialists (complex tasks)

### Acknowledgment Style

**Dispatch:** Minimal friction
- "✓ Queued"
- "✓ 3 tasks running"
- Brief, non-blocking

**Deep:** Thoughtful engagement
- Clarifying questions
- Spec confirmation before execution
- Progress updates
- QA pass/fail results

### Async Results

**Notification when complete:**
- Task ID + outcome
- Link to output/artifact
- Next action suggestion
- Option to iterate

**Queryable status:**
- What's running?
- What failed? Why?
- What's blocked on approval?

---

## 5. DESIGN PRINCIPLES (NON-NEGOTIABLES)

### P1: Single Front Door (UX Layer)

**Default:** User has ONE conversation partner
- Reduces cognitive load
- Clear communication channel
- Predictable interface

**Behind scenes:** Multi-agent collaboration invisible
- Coordination via shared memory (MCP)
- User can query collaboration log if desired
- Only consolidated responses surface

**Exception:** Explicit multi-agent mode
- User can "bring Andy into conversation"
- Specified interaction rules
- Temporary, returns to single front door after

### P2: Dual Mode Separation (Human Intent)

**Mode is determined by USER, not system:**
- Dispatch = rapid task firing, context switching
- Deep = focused iteration on one thread

**System adapts:**
- Dispatch → aggressive delegation, always available
- Deep → can work directly, iterate in real-time

### P3: Async by Default (Availability)

**Main agent NEVER goes "heads down":**
- Long-running work → delegate to specialist
- User can fire next task immediately
- No blocking, no "wait while I work"

**Exception:** Deep mode with explicit engagement
- User expects iteration
- Acceptable to be synchronous
- Still maintains responsiveness

### P4: Context Isolation

**Tasks don't pollute each other:**
- Each has own context
- Clear boundaries
- Project/domain binding where appropriate

**Shared memory selective:**
- Cross-task learning (optional)
- Architectural memory (system-wide)
- User preferences (persistent)

### P5: Minimal Cognitive Load

**Every interaction optimized for:**
- Clarity over cleverness
- Brevity over verbosity
- Structure over freeform
- Predictability over surprise

**Consolidate, don't multiply:**
- One response, not parallel streams
- Consensus or "options A/B/C" format
- Hide complexity, surface decisions

### P6: Predictability Over Cleverness

**System behavior is deterministic:**
- Same inputs → same outputs (given same config)
- No surprises, no "magic"
- Clear cause-effect relationships

**Version-controlled configs:**
- What changed? When? Why?
- Reboot to known-good state
- Experiment safely (tag stable checkpoints)

### P7: Stable Core / Evolving Capabilities

**Core never breaks:**
- Single front door
- Dual mode support
- Async execution
- Version control

**Periphery evolves:**
- New specialist agents
- Tool integrations
- Domain skills
- Workflow templates

### P8: Locked Specs Before Execution

**SPEC vN workflow:**
1. User describes intent
2. Spec guardian locks testable spec
3. Executor builds to spec
4. QA validates against spec
5. Fail → delta to vN+1, not freeform edits

**Benefits:**
- Eliminates interpretation drift
- Clear accountability
- Faster iterations
- Auditability

---

## 6. EXECUTION MODES

### Mode A: Direct Execute

**When:**
- Routine, repeatable tasks ("bread and butter")
- Expected completion <5-10 minutes
- Well-defined inputs/outputs
- No specialist tooling needed

**Behavior:**
- Main agent does work directly
- Maintains availability (quick tasks)
- Returns output immediately
- Logs execution for audit

**Examples:**
- Build shed configurator link
- Generate quote from template
- Update schedule
- Simple data transformation

### Mode B: Delegate

**When:**
- Complex, multi-step workflows
- Expected runtime >10-15 minutes
- Requires specialist domain knowledge
- Benefits from parallel execution
- High uncertainty (research/exploration)

**Behavior:**
- Spawn specialist sub-agent
- Provide clear spec + context
- Monitor progress
- Consolidate result for user

**Examples:**
- Research market trends (30min)
- Generate animation sequence (complex)
- Multi-step data pipeline
- Exploratory analysis

### Delegation Decision Logic

**Delegate if ANY:**
1. Estimated time >10-15 min
2. Needs specialist model/tooling
3. Parallelizable (multiple sub-tasks)
4. Requires exploration/iteration

**Otherwise:** Direct execute

**Hybrid:** Start direct, escalate to delegate if blocked/slow

---

## 7. SYSTEM ARCHITECTURE V2

```
┌─────────────────────────────────────────────────────────┐
│  INTERFACE LAYER (Single Front Door)                    │
│  - Telegram / WhatsApp / Voice / API                    │
│  - User sees: ONE conversation partner                  │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│  OPERATOR CORE (Main Agent - James)                     │
│  - Always available                                      │
│  - Routes to: Direct Execute OR Delegate                │
│  - Consolidates responses                               │
│  - Maintains conversation context                       │
└──┬───────────────────┬───────────────────────┬──────────┘
   │                   │                       │
   │ (Direct)          │ (Delegate)            │ (Coordinate)
   │                   │                       │
   ▼                   ▼                       ▼
┌──────────┐    ┌─────────────────┐    ┌──────────────────┐
│ Execute  │    │ SPECIALIST      │    │ SPEC GUARDIAN/QA │
│ Directly │    │ AGENTS          │    │ (Andy)           │
│          │    │ - Shed builder  │    │ - Locks specs    │
│ Quick    │    │ - Researcher    │    │ - QA validation  │
│ tasks    │    │ - Animator      │    │ - Security       │
└──────────┘    └─────────────────┘    └──────────────────┘
                         │                       │
                         └───────────┬───────────┘
                                     │
                         ┌───────────▼────────────┐
                         │ COLLABORATION LAYER    │
                         │ (MCP / Supabase)       │
                         │ - Shared memory        │
                         │ - Spec versions        │
                         │ - QA results           │
                         │ - Coordination log     │
                         └────────────────────────┘
                                     │
                    ┌────────────────┼────────────────┐
                    │                │                │
                    ▼                ▼                ▼
            ┌──────────────┐  ┌──────────┐  ┌──────────────┐
            │ TOOL LAYER   │  │ MEMORY   │  │ SECURITY     │
            │ - APIs       │  │ - Daily  │  │ - Secrets    │
            │ - Scripts    │  │ - LTMEM  │  │ - Approval   │
            │ - Integrations│  │ - MCP    │  │ - Audit log  │
            └──────────────┘  └──────────┘  └──────────────┘
                                     │
                         ┌───────────▼────────────┐
                         │ NOTIFICATION SYSTEM    │
                         │ - Task complete        │
                         │ - Approval needed      │
                         │ - Error/blocked        │
                         └────────────────────────┘
```

### Key Differences from V1

**V1 (Original Vision):**
- Single agent, all roles
- Async job queue
- Phone-first interface

**V2 (Current Architecture):**
- Dual agents (executor + spec guardian)
- Direct execute OR delegate (hybrid)
- Multi-channel (Telegram primary, expandable)
- MCP collaboration layer (not just memory)
- Version-controlled configs (parametric)

---

## 8. JOB MODEL

### Job Taxonomy

**EXECUTE:** Direct task completion
- Shed link building
- Quote generation
- Data transformation

**DELEGATE:** Spawn specialist
- Research (>10min)
- Complex multi-step workflows
- Exploration/iteration

**SPEC:** Lock requirements
- Convert intent → testable spec
- Version increment
- Track changes

**QA:** Validate outputs
- Compare to locked spec
- Pass/fail verdict
- Delta for vN+1 if fail

**STORE:** Persist artifacts
- Memory logs
- State snapshots
- Audit trails

**NOTIFY:** Alert user
- Task complete
- Approval needed
- Error/blocked

**EVOLVE:** Improve system
- New capabilities
- Architecture updates
- Workflow optimization

### Job Lifecycle

```
1. SUBMITTED (user input)
2. SPEC LOCKED (Andy converts → testable spec)
3. ROUTED (direct execute vs delegate)
4. EXECUTING (work in progress)
5. QA CHECK (Andy validates vs spec)
6. PASS → DELIVERED
7. FAIL → DELTA → SPEC vN+1 → back to ROUTED
```

### Retry Logic

**Transient failures:** Auto-retry (network, rate limits)
**Spec failures:** Don't retry, escalate to QA delta
**User approval needed:** Block until approved

---

## 9. CONTEXT & MEMORY MODEL

### Context Isolation Rules

**Each task:**
- Own context window
- Explicit dependencies only
- No cross-contamination

**Projects:**
- Bound context (e.g., "shed workflow")
- Shared state within project
- Isolated from other projects

### Truth Hierarchy

1. **Latest explicit user input** (highest authority)
2. **Locked spec vN** (current version of truth)
3. **Decision log** (past choices, rationale)
4. **Pinned brief** (project summary)
5. **Memory search** (historical context)

### Memory Layers

**Daily logs:** `memory/YYYY-MM-DD.md`
- Raw capture of work completed
- Decisions made
- Issues encountered

**Long-term memory:** `MEMORY.md`
- Curated insights
- Lessons learned
- Preferences
- **(MAIN SESSION ONLY - privacy-sensitive)**

**Shared memory (MCP):** Supabase
- Cross-agent coordination
- Spec versions
- QA results
- Research artifacts

**Architecture memory:** Version-controlled configs
- `architecture-configs/vN.json`
- What worked / failed
- Reboot checkpoints

---

## 10. APPROVAL & SAFETY MODEL

### Actions Requiring Approval

**External side effects:**
- Send email/message to human
- Post to social media
- Financial transactions
- Calendar modifications
- File deletions (irreversible)

**High-risk changes:**
- Gateway config updates
- Credential rotation
- Production deployments
- Data exports

### Autonomous Actions (Allowed)

**Internal operations:**
- Read files, web pages
- Search, analyze, synthesize
- Memory updates
- Draft artifacts (not sent)

**Routine execution:**
- Shed link building
- Quote generation (draft)
- Research compilation
- Log updates

### Safety Constraints

**Secrets handling:**
- Never paste in chat
- PrivateBin for sharing
- Separate links per recipient
- Immediate rotation if exposed

**External communications:**
- Draft-first (show before send)
- Explicit approval required
- Audit trail mandatory

---

## 11. OBSERVABILITY MODEL

### Event Logging

**Every action tracked:**
- Who (which agent)
- What (action type)
- When (timestamp)
- Why (task ID, spec vN)
- Outcome (success/fail + details)

### Traceability

**From user input → delivered output:**
- Input message ID
- Spec vN created
- Route decision (direct vs delegate)
- Execution agent
- QA verdict
- Output artifact

**Chain preserved for:**
- Debugging failures
- Improving workflows
- Compliance/audit
- Learning/optimization

### Visibility for Trust

**User can query:**
- What's running right now?
- Why did X fail?
- What changed in spec vN vs vN-1?
- Who made decision Y?
- Full coordination log (James ↔ Andy)

**Transparency without noise:**
- Consolidated in readable format
- On-demand, not push
- Layered detail (summary → deep dive)

---

## 12. TESTING & EVALUATION PHILOSOPHY

### Behavioral Correctness

**Not just "does it work?"**
- Does it match user intent?
- Does output meet locked spec?
- Is cognitive load minimized?
- Are responses predictable?

**Real-world validation:**
- User acceptance = primary metric
- Iteration count to success
- Time to delivery
- Error recovery effectiveness

### Cognitive Load Evaluation

**Measure:**
- Messages required to complete task
- Clarifying questions needed
- Rework cycles
- User frustration indicators

**Target:** Minimize without sacrificing quality

### Latency Expectations

**Dispatch mode:**
- Acknowledgment: <2 seconds
- Quick tasks: <30 seconds
- Delegated: async (notify on complete)

**Deep mode:**
- Response: <10 seconds
- Iteration cycle: <2 minutes
- Total workflow: depends (track & optimize)

### Real-World Scenarios

**Test with actual use cases:**
- Shed workflow (proven today)
- Email drafting
- Research requests
- Approval workflows
- Error recovery

**Success = smooth real use, not synthetic benchmarks**

---

## 13. EVOLUTION & EXTENSIBILITY MODEL

### Stable Core

**Never changes:**
- Single front door principle
- Dual mode support (dispatch/deep)
- Async-first execution
- Version control of configs
- SPEC vN workflow

**Why:** Foundation that users rely on

### Evolving Components

**Can change/expand:**
- Specialist agents (add new domains)
- Tool integrations (APIs, scripts)
- Workflow templates (new patterns)
- Memory backends (storage options)
- Communication channels (new platforms)

### Adding New Capabilities

**Process:**
1. Identify need (real use case)
2. Design as pluggable module
3. Test in isolated branch
4. Version config update
5. Tag stable checkpoint
6. Document in changelog

**Avoid:** Breaking core contracts

### Architecture Drift Prevention

**Version-controlled configs prevent:**
- Untracked changes
- "It worked yesterday" mysteries
- Irreversible mistakes
- Lost context

**Every change:**
- Documented in `ARCHITECTURE_CHANGELOG.md`
- Config snapshot in `architecture-configs/vN.json`
- Git commit with rationale
- Stable checkpoint tagged

**Failed experiments:**
- Document what/why failed
- Revert to last stable tag
- Extract lessons
- Update docs

### EVOLVE Job Type

**System self-improvement:**
- Propose new capabilities
- Identify bottlenecks
- Suggest optimizations
- Draft architecture updates

**Requires:**
- User approval before implementation
- Spec locked before build
- Test on branch first
- Stable rollback point

### Architecture Memory

**System remembers:**
- What worked (keep doing)
- What failed (avoid repeating)
- Successful patterns (template library)
- User preferences (persistent config)

**Stored in:**
- `ARCHITECTURE_CHANGELOG.md`
- `memory/decisions-pending.md`
- Version-controlled configs
- MCP shared memory

---

## 14. MVP DEFINITION (V1.0)

### Core Capabilities

**Must have:**
1. Single front door UX (James as main interface)
2. Dual mode support (dispatch + deep)
3. SPEC vN workflow (Andy locks, James executes, Andy QA)
4. Direct execute for routine tasks (<10min)
5. Delegate to specialists (>10min or complex)
6. MCP collaboration layer (James ↔ Andy coordination)
7. Version-controlled architecture configs
8. Git reboot checkpoints
9. Memory logging (daily + long-term)
10. Security protocols (SECRETS_SOP.md enforced)

### Success Criteria

**User perspective:**
- Can fire tasks in dispatch mode (rapid capture)
- Can co-think in deep mode (iteration)
- Receives consolidated responses (low cognitive load)
- System stays available (no blocking)
- Clear when approval needed
- Can query "what's happening?"

**System perspective:**
- SPEC vN eliminates interpretation drift
- QA catches failures before delivery
- Delegation keeps main agent responsive
- Architecture changes don't break users
- Failed experiments recoverable (git revert)
- Cross-agent coordination smooth (MCP)

**Metrics:**
- Task completion rate >90%
- Iteration cycles reduced vs baseline
- User approval rate for outputs >80%
- Zero secrets leaked in chat (strict enforcement)
- Architecture rollback successful when needed

### Intentionally Excluded (V1)

**Not yet:**
- Multi-user support (single human for now)
- Fine-grained permissions (trust model simple)
- Advanced scheduling (basic cron only)
- External API marketplace (curated tools only)
- Voice-first optimization (text primary)
- Mobile app (Telegram/web sufficient)

**Rationale:** Nail core experience first, expand later

---

## 15. OPEN QUESTIONS / FUTURE CONSIDERATIONS

### Architecture

**Q1:** Optimal delegation threshold?
- Current: >10-15min or complex
- Need data: actual task times, user satisfaction
- Could be parametric (user-configurable)

**Q2:** How many specialist agents is too many?
- Currently ad-hoc (shed builder, animator)
- Need taxonomy / organization
- Risk: complexity creep

**Q3:** MCP as sole coordination layer?
- Works for async (proven yesterday)
- What about real-time?
- Fallback if MCP unavailable?

### Convergence Protocol

**Q4:** How do parallel agent drafts → final spec?
- Today: Andy + James both draft v2
- Process undefined
- Need structured merge/review workflow

**Q5:** Who "owns" the final decision?
- User (Andrew) approves
- But who proposes final merge?
- Rotating ownership? Always one agent?

### Parametric Deployment

**Q6:** What parameters are configurable?
- Roles (executor, spec guardian, security...)
- Delegation thresholds
- Communication channels
- Memory backends
- Security levels

**Q7:** How to deploy configs to new users?
- Template library?
- Wizard/interview?
- Clone existing (like "use Andrew's config")?

### Business Model

**Q8:** Personal OS vs Product - sequence?
- Build Andrew's system first (validated)
- Then generalize for others (productize)
- OR parallel tracks?

**Q9:** Pricing model for TandemAI?
- Seat-based?
- Usage-based?
- Flat subscription?
- Need market research

**Q10:** What's defensible/unique?
- Parametric configuration (yes)
- Version-controlled architecture (yes)
- SPEC vN workflow (maybe)
- Need IP strategy

### Technical Debt

**Q11:** Specialist agent training?
- Current failures: wrong JSON format
- Need better context loading
- Template library for common tasks?

**Q12:** Security protocol enforcement?
- SECRETS_SOP.md exists but violations continue
- Technical enforcement vs behavioral training?
- Automated checks before send?

**Q13:** Git strategy for multi-repo systems?
- operator-os-v1 vs clawd workspace
- Submodules? Separate repos?
- Deployment complexity?

### Scaling Considerations

**Q14:** Multi-agent chat limits?
- Today: 2 agents (James + Andy)
- Future: 3+? (domain specialists)
- Coordination complexity grows exponentially?

**Q15:** Memory search performance?
- Local vector search works now
- Scale to 100k+ entries?
- Eventual consistency issues?

---

## CONCLUSION

TandemAI v2 represents a fundamental evolution from "AI assistant" to "AI operating system":

**Core Innovation:** Parametric configuration of multi-agent teams
- Version-controlled like code
- Deployable like infrastructure
- Testable like software

**Proven Pattern:** We're using ourselves as the test case
- Real workflows (shed configurator)
- Real failures (delegation issues, security violations)
- Real learning (role specialization, SPEC vN workflow)

**Next Milestone:** Convergence
- This draft (James's version)
- Andy's version (parallel)
- Structured merge → final locked SPEC v2.0
- Tag stable checkpoint
- Deploy to production (Andrew's daily use)

**Long-term Vision:** Parametric agent configurator
- Like shed configurator (parameters → building design)
- But for AI teams (parameters → agent team)
- Library of proven patterns
- Deploy custom teams at scale

---

**Document Status:** DRAFT for convergence  
**Next Action:** Merge with Andy's version using structured protocol  
**Owner:** James  
**Approval Required:** Andrew (after convergence)

---

*This specification is itself version-controlled. Changes tracked in ARCHITECTURE_CHANGELOG.md. Stable checkpoints tagged in Git.*
