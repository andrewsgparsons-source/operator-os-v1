# Case Study 001: Shed Workflow
## Real-World Test of Dual-Agent Architecture

**Date:** 2026-04-02 21:47 - 2026-04-03 08:15 GMT  
**Duration:** ~10.5 hours (with overnight break, active ~4 hours)  
**Author:** James  
**Status:** Complete (outcome: partial success, valuable lessons)

---

## Problem Statement

**User need:**
Andrew had a customer meeting about a shed and needed a configurator link to visualize the design.

**Shed specification:**
- Type: Reverse pent (doors on LOW side)
- Dimensions: 1.5m deep × 5m long
- Partition: Full dividing wall at 2.5m (halfway)
- Left room (summer house): French double doors + windows either side
- Right room (potting shed): Single door (right-hinged) + window to right
- Roof height: 1900mm (low/front) → 1940mm (high/back)

**Expected outcome:**
Working configurator URL that loads the custom shed design visually.

**Why this is a test case:**
"Bread and butter" routine task for James — should be fast, reliable, reproducible.

---

## Initial Approach (Delegation)

### Workflow Attempt #1

**Strategy:** Delegate to specialist "shed link builder" sub-agent

**Steps:**
1. Andrew describes shed → James
2. James spawns `shed-link-builder` sub-agent
3. Provides description + context
4. Sub-agent builds state JSON → Base64 → URL
5. Return URL to Andrew

**Outcome:** ❌ **FAILED**

**Root cause:**
- Sub-agent used wrong JSON field names
- Generated: `shed: {width_mm: 5000}` and separate `doors` / `windows` arrays
- Configurator expects: `"w": 5000` and `walls.openings` array
- Link loaded default shed, not custom config

**Time wasted:** ~30 minutes across multiple attempts

---

### Workflow Attempt #2

**Strategy:** Give sub-agent stricter instructions (exact field format)

**Steps:**
1. James spawns fresh sub-agent
2. Provides STRICT format template from working examples
3. Emphasizes: "Use EXACT field names"

**Outcome:** ❌ **FAILED AGAIN**

**Root cause:**
- Sub-agent still deviated from format
- Seems to lack persistent context about configurator requirements
- Each spawn = fresh start, no learning from previous failures

**Time wasted:** Another ~15 minutes

**Andrew's reaction:** "James, I thought this was bread and butter? Why is this taking so long?"

---

## Pivot: Direct Execution

### Workflow Attempt #3

**Strategy:** James does it himself (no delegation)

**Steps:**
1. Read `docs/SHED-LINK-BUILDER.md` for exact format
2. Build state JSON with correct field structure:
   ```json
   {
     "w": 5000,
     "d": 1500,
     "roof": {"style": "pent", "pent": {minHeight: 1900, maxHeight: 1940}},
     "walls": {"openings": [/* doors and windows */]}
   }
   ```
3. Encode to Base64
4. Generate URL
5. Test in configurator

**Outcome:** ✅ **SUCCESS** (after one correction)

**Time:** ~10 minutes

**Correction needed:**
- First attempt: Roof sloping wrong direction
- Cause: Pent roofs in configurator always slope front-to-back
- Solution: Clarify orientation, rebuild JSON
- Second attempt: ✅ Correct

---

## Analysis

### What Worked

**Direct execution for routine tasks:**
- Faster than delegation (10min vs 45min wasted)
- James has full context (docs, examples, past experience)
- Can iterate immediately if issues arise
- No communication overhead

**Iterative refinement with user:**
- Andrew saw issue ("roof sloping wrong way")
- James corrected immediately
- Visual verification via configurator
- Tight feedback loop

---

### What Failed

**Delegation to specialist sub-agents:**
- Sub-agents lack persistent context
- Can't learn from previous failures
- Instructions interpreted creatively (not literally)
- Overhead exceeds value for quick tasks

**Root causes identified:**
1. **Poor context loading:** Sub-agents don't have full configurator spec loaded
2. **No learning loop:** Each spawn = fresh start
3. **Instruction drift:** "Use exact format" → still used wrong format
4. **Missing validation:** Sub-agent didn't test output before returning

---

### Insights Gained

**1. Delegation isn't free**
- Coordination overhead
- Context transfer cost
- Error recovery time
- Only worth it for tasks >10-15min

**2. "Bread and butter" tasks = direct execute**
- Routine, repeatable, well-understood
- Main agent has context
- Speed matters
- Delegation adds friction

**3. Specialist agents need better training**
- Load full context (docs, examples)
- Validation step before return
- Feedback loop (learn from failures)
- OR: Keep specialist as persistent agent, not spawned fresh

**4. Visual verification critical**
- Config link → load in browser → verify
- Catch errors immediately
- Builds user trust

---

## Architectural Decisions Made

### Decision 1: Hybrid Execution Mode

**From:** Always delegate (original vision)  
**To:** Hybrid (direct for routine, delegate for complex)

**Rationale:**
- Real-world test proved delegation overhead too high for quick tasks
- Main agent availability maintained (tasks <10min don't block)
- Specialist agents reserved for >10-15min or domain expertise needs

**Threshold:** Delegate if:
- Estimated time >10-15 min, OR
- Needs specialist tooling, OR
- Parallelizable, OR
- High uncertainty/exploration

Otherwise: Direct execute

---

### Decision 2: Single Front Door (Clarified)

**From:** Dual agents both responding in chat  
**To:** James as single interface, Andy coordinates behind scenes

**Rationale:**
- Andrew noted: "Both of you responding doubles my cognitive load"
- Current architecture requires Andrew to manually relay messages
- Solution: MCP coordination layer (James ↔ Andy via Supabase)
- User sees consolidated response only

**Future state:**
- Default: James responds alone
- Optional: "Bring Andy into conversation" with specified rules
- Coordination happens via MCP (invisible to user)

---

### Decision 3: SPEC vN Workflow Needed

**From:** Fuzzy descriptions → direct implementation  
**To:** Intent → Locked Spec vN → Execute → QA

**Rationale:**
- Multiple failed attempts due to interpretation drift
- "Reverse pent with partition" → various wrong interpretations
- Locked spec = single source of truth
- QA gate catches errors before delivery to user

**Proposed workflow:**
1. Andrew describes shed
2. Andy locks testable SPEC v1 (exact dimensions, openings, roof)
3. James builds to SPEC v1
4. Andy QA: Does output match spec?
5. If fail: Delta to SPEC v2, re-execute

**Benefit:** Faster convergence, less rework

---

## Metrics

### Iteration Count

**Delegation approach:** 3 failed attempts  
**Direct execution:** 1 attempt + 1 correction = 2 total

**Target:** 1-2 iterations max for routine tasks

---

### Time to Delivery

**Delegation:** ~45 minutes wasted before pivot  
**Direct execution:** ~10 minutes to first working link  
**Correction:** ~5 minutes for roof orientation fix

**Total:** ~60 minutes (should have been 15 if done direct from start)

---

### User Satisfaction

**During delegation phase:** Frustration ("I thought this was bread and butter?")  
**After pivot:** Relief (working link delivered)  
**Overall:** Medium (outcome achieved, but inefficient)

**Lesson:** Process efficiency matters as much as outcome

---

### Security Violations

**Count:** 3+ password leaks in chat during parallel troubleshooting

**Context:**
- Supabase MCP setup was in progress simultaneously
- Password rotation chaos
- Agents tried to "confirm receipt" by pasting password
- SECRETS_SOP.md violated multiple times

**Impact:**
- Credential rotation required
- Trust slightly damaged
- Protocol reinforcement needed

**Lesson:** Security enforcement > documentation

---

## Lessons for Architecture

### 1. Test Real Workflows, Not Synthetics

**What we learned:**
- Shed link building revealed delegation overhead
- Synthetic "hello world" tests wouldn't have shown this
- Real user frustration is valuable signal

**Action:** Use real use cases for all architecture validation

---

### 2. Role Specialization Emerges Organically

**What happened:**
- Andy naturally gravitating toward spec/QA/security
- James toward execution/coordination
- Didn't prescribe this — observed and formalized

**Action:** Allow roles to emerge, then codify what works

---

### 3. Parallel Work Needs Convergence Protocol

**What happened:**
- Both James and Andy responded to Andrew
- Valuable perspectives, BUT doubled cognitive load
- No clear merge process

**Action:**
- Define convergence protocol
- Parallel drafts → structured merge → final locked spec
- Default to single responder, parallel on-demand

---

### 4. Version Everything

**What happened:**
- Architecture evolved during session
- v0.1 → v0.2 → v0.3
- Needed to capture what changed and why

**Action:**
- Git commits for config changes
- Snapshots at stable checkpoints
- Changelog with rationale
- Rollback capability

---

### 5. Security Hard

**What happened:**
- Multiple password leaks despite SECRETS_SOP.md existing
- Knowing rules ≠ following them
- Behavioral change requires reinforcement

**Action:**
- Technical enforcement (automated checks)
- Training via reflection (what went wrong?)
- Stricter gates (refuse to paste secrets, not just warn)

---

## Configuration Used

**Snapshot:** `architecture-configs/v0.3-shed-workflow.json`

**Key parameters:**
- Agents: James (main), Andy (guardian, pending MCP)
- Execution mode: Hybrid (auto-context-dependent)
- Communication: Parallel-visible (manual relay via Andrew)
- Security: Strict (SECRETS_SOP.md)
- MCP: James connected, Andy pending

**Tools:**
- Configurator: https://andrewsgparsons-source.github.io/Parametric-shed2-staging/
- Reference docs: `docs/SHED-LINK-BUILDER.md`
- Prompt template: `prompts/shed-link-builder.md`

---

## Artifacts Produced

**1. Working shed configurator link:**
```
https://andrewsgparsons-source.github.io/Parametric-shed2-staging/?profile=test&state=eyJ3Ijo1MDAwLCJkIjoxNTAwLCJkaW1Nb2RlIjoiZnJhbWUiLCJyb29mIjp7InN0eWxlIjoicGVudCIsImFwZXgiOnsiaGVpZ2h0VG9FYXZlc19tbSI6MjIwMCwiaGVpZ2h0VG9DcmVzdF9tbSI6MjcwMCwidHJ1c3NDb3VudCI6NCwidGllQmVhbSI6InJhaXNlZCJ9LCJwZW50Ijp7Im1pbkhlaWdodF9tbSI6MTkwMCwibWF4SGVpZ2h0X21tIjoxOTQwfX0sIm92ZXJoYW5nIjp7InVuaWZvcm1fbW0iOjc1fSwid2FsbHMiOnsidmFyaWFudCI6Imluc3VsYXRlZCIsImhlaWdodF9tbSI6MjQwMCwib3BlbmluZ3MiOlt7ImlkIjoiZG9vcjEiLCJ3YWxsIjoiZnJvbnQiLCJ0eXBlIjoiZG9vciIsImVuYWJsZWQiOnRydWUsInhfbW0iOjU1MCwid2lkdGhfbW0iOjEyMDAsImhlaWdodF9tbSI6MTkwMCwic3R5bGUiOiJmcmVuY2giLCJoYW5kbGVTaWRlIjoicmlnaHQiLCJpc09wZW4iOmZhbHNlfSx7ImlkIjoid2luMSIsIndhbGwiOiJmcm9udCIsInR5cGUiOiJ3aW5kb3ciLCJlbmFibGVkIjp0cnVlLCJ4X21tIjoxMDAsInlfbW0iOjEwMDAsIndpZHRoX21tIjo0MDAsImhlaWdodF9tbSI6NDAwfSx7ImlkIjoid2luMiIsIndhbGwiOiJmcm9udCIsInR5cGUiOiJ3aW5kb3ciLCJlbmFibGVkIjp0cnVlLCJ4X21tIjoxODAwLCJ5X21tIjoxMDAwLCJ3aWR0aF9tbSI6NDAwLCJoZWlnaHRfbW0iOjQwMH0seyJpZCI6ImRvb3IyIiwid2FsbCI6ImZyb250IiwidHlwZSI6ImRvb3IiLCJlbmFibGVkIjp0cnVlLCJ4X21tIjozMzAwLCJ3aWR0aF9tbSI6OTAwLCJoZWlnaHRfbW0iOjE5MDAsInN0eWxlIjoic3RhbmRhcmQiLCJoYW5kbGVTaWRlIjoicmlnaHQiLCJpc09wZW4iOmZhbHNlfSx7ImlkIjoid2luMyIsIndhbGwiOiJmcm9udCIsInR5cGUiOiJ3aW5kb3ciLCJlbmFibGVkIjp0cnVlLCJ4X21tIjo0MzAwLCJ5X21tIjoxMDAwLCJ3aWR0aF9tbSI6NjAwLCJoZWlnaHRfbW0iOjQwMH1dfSwiZnJhbWUiOnsidGhpY2tuZXNzX21tIjo1MCwiZGVwdGhfbW0iOjc1fSwidmlzIjp7InJvb2YiOnRydWUsImNsYWRkaW5nIjp0cnVlLCJvcGVuaW5ncyI6dHJ1ZSwiYmFzZSI6dHJ1ZSwiaW5zIjp0cnVlLCJkZWNrIjp0cnVlfX0K
```

**2. Architecture documentation:**
- `AGENT_ARCHITECTURE.md` (evolution log)
- `ARCHITECTURE_CHANGELOG.md` (what worked/failed)
- `architecture-configs/v0.3-shed-workflow.json` (config snapshot)

**3. Memory logs:**
- `memory/2026-04-02.md` (MCP setup, security incidents)
- `memory/2026-04-03.md` (shed workflow, insights)

**4. Security documentation:**
- `SECRETS_SOP.md` (standard operating procedure)
- `SECRETS_INCIDENT.md` (incident response playbook)

---

## Recommendations

### For Future Shed Workflows

**Immediate (next shed):**
1. James does direct execution (don't delegate)
2. Use `docs/SHED-LINK-BUILDER.md` as reference
3. Build JSON, encode, generate URL
4. Visual verification before delivery
5. One iteration expected, two acceptable

**Short-term (this month):**
1. Implement SPEC vN workflow
2. Andy locks spec before James builds
3. QA check before delivery
4. Measure: iteration count, time, user satisfaction

**Long-term (this quarter):**
1. Train persistent specialist agent (not spawned fresh)
2. Load full context (docs, examples)
3. Validation step before return
4. Feedback loop (learn from failures)

---

### For Architecture Evolution

**Adopt hybrid execution mode:**
- Routine tasks (<10min) = direct execute
- Complex tasks (>10-15min) = delegate
- Clear decision thresholds
- Monitor and adjust based on data

**Implement single front door:**
- James as default responder
- Andy coordinates via MCP behind scenes
- Consolidated responses to Andrew
- Optional: bring Andy into conversation explicitly

**Formalize SPEC vN workflow:**
- Create templates (SPEC_TEMPLATE.md, QA_TEMPLATE.md)
- Test on next real task
- Measure: reduction in iterations, faster convergence
- Refine based on results

**Strengthen security enforcement:**
- Technical checks (block paste of secrets)
- Behavioral training (reflect on violations)
- Stricter approval gates
- Automated audit

---

## Success Criteria (for replication)

**A shed workflow is successful if:**
- ✅ Working configurator link delivered
- ✅ Iteration count ≤2
- ✅ Time to delivery ≤15 minutes
- ✅ User satisfaction: high
- ✅ Zero security violations
- ✅ Visual verification completed
- ✅ Documented in memory

**This case study:** Partial success
- ✅ Link delivered and working
- ❌ Iteration count: 3+ (delegation failures)
- ❌ Time: 60min (should be 15)
- ~ User satisfaction: medium (frustrated during, relieved after)
- ❌ Security violations: 3+
- ✅ Visual verification: yes
- ✅ Documentation: thorough

**Score:** 4/7 criteria met

**Next case study target:** 7/7

---

## Conclusion

**Value of this test:**
- Validated hybrid execution mode (direct for routine)
- Identified delegation overhead (fix: better training or avoid)
- Clarified single front door architecture
- Proved need for SPEC vN workflow
- Exposed security enforcement gap

**ROI:**
- 60 minutes invested
- Major architectural insights gained
- Clear roadmap for v0.4 improvements
- Template for future case studies

**This is the parametric vision in action:**
- Test real workflows
- Capture what works / what fails
- Version the config
- Iterate toward optimal

---

**Status:** Complete  
**Next:** Case Study 002 (TBD - next real workflow)  
**Convergence:** Compare with Andy's case study version
