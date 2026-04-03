# State Snapshot Template
## Version-Controlled Architecture Checkpoints

**Purpose:** Capture working configurations for rollback/replication  
**Author:** James  
**Format:** Markdown + JSON reference  
**Date:** 2026-04-03

---

## When to Create Snapshots

**Required:**
- Before major architecture changes
- After successful workflow validation
- When tagging stable checkpoints
- After resolving incidents

**Optional but recommended:**
- End of each week (if changes made)
- Before experimenting with new approaches
- When onboarding new capabilities

---

## Snapshot Format

### Metadata Section

```markdown
# State Snapshot: [NAME]

**Version:** vX.Y  
**Date:** YYYY-MM-DD HH:MM TZ  
**Git Commit:** [hash or tag]  
**Status:** [stable | experimental | deprecated]  
**Author:** [who created this snapshot]  
**Validated:** [yes | no | partial]

## Context

**Why this snapshot:**
[Brief explanation of what prompted this checkpoint]

**Key changes from previous:**
[What's different from last stable state]

**Known issues:**
[Any problems or limitations]
```

---

### Configuration Reference

```markdown
## Configuration

**JSON:** `architecture-configs/vX.Y-[name].json`

**Key parameters:**
- Agents: [list active agents]
- Execution mode: [direct | delegate | hybrid]
- Communication: [single front door | parallel | ...]
- Security level: [strict | moderate | dev]
- MCP status: [connected | pending | disabled]

**Workspace:**
- Location: [path]
- Git remote: [url]
- Branch: [name]
```

---

### Test Results

```markdown
## Validation

**Test workflows:**
1. [Workflow name]: ✅ Pass / ❌ Fail / ⏭️ Skipped
   - Expected: [what should happen]
   - Actual: [what did happen]
   - Notes: [observations]

**Metrics:**
- Task completion rate: X%
- Iteration cycles (avg): X
- Time to delivery (avg): Xmin
- Security violations: X
- User satisfaction: [high | medium | low]

**Success criteria met:** [yes | no | partial]
```

---

### Rollback Instructions

```markdown
## Rollback Procedure

If this config fails, revert to previous stable state:

**Step 1: Git revert**
\`\`\`bash
git checkout [previous-stable-tag]
# Or create recovery branch
git checkout -b recovery-from-vX.Y
\`\`\`

**Step 2: Restore config**
\`\`\`bash
cp architecture-configs/[previous-version].json current-config.json
# Or manually apply config changes
\`\`\`

**Step 3: Verify services**
- [ ] Main agent responsive
- [ ] Guardian agent connected (if applicable)
- [ ] MCP accessible
- [ ] Memory layers readable
- [ ] Security protocols active

**Step 4: Document failure**
Update `ARCHITECTURE_CHANGELOG.md` with:
- What failed
- Why it failed
- Lessons learned
- Rollback performed
```

---

### Deployment Checklist

```markdown
## Deployment (if replicating this config)

**Prerequisites:**
- [ ] Git repository set up
- [ ] Workspace directory created
- [ ] API keys / credentials configured
- [ ] MCP backend accessible (if used)
- [ ] Communication platform configured

**Steps:**
1. [ ] Clone config JSON to `architecture-configs/`
2. [ ] Update workspace paths (if different machine)
3. [ ] Verify agent platform availability
4. [ ] Test connection to coordination layer
5. [ ] Run validation workflows
6. [ ] Tag as stable if all pass

**Post-deployment:**
- [ ] Monitor for 24h
- [ ] Log any issues
- [ ] Update documentation if needed
```

---

### Change Log

```markdown
## Changes in This Version

**Added:**
- [Feature X]
- [Capability Y]

**Modified:**
- [Behavior Z changed from A to B]
- [Config parameter Q updated]

**Removed:**
- [Deprecated feature R]

**Fixed:**
- [Bug S]
- [Issue T]

**Known limitations:**
- [Limitation U]
```

---

## Example Snapshot

```markdown
# State Snapshot: Shed Workflow Test

**Version:** v0.3  
**Date:** 2026-04-03 07:12 GMT  
**Git Commit:** agent-arch-v0.3  
**Status:** experimental  
**Author:** James  
**Validated:** partial (main workflow tested, full validation pending)

## Context

**Why this snapshot:**
Real-world shed workflow test revealed role specialization pattern and need for SPEC vN workflow. Capturing this state before further iteration.

**Key changes from v0.2:**
- Added Andy as spec guardian (organic role emergence)
- Defined execution mode policy (direct vs delegate)
- Clarified single front door architecture
- Identified MCP as coordination layer

**Known issues:**
- Andy MCP connection still pending
- Delegation to sub-agents failing (need better context)
- Security violations ongoing (password leaks in chat)

## Configuration

**JSON:** `architecture-configs/v0.3-shed-workflow.json`

**Key parameters:**
- Agents: James (main), Andy (guardian, pending MCP)
- Execution mode: Hybrid (auto-context-dependent)
- Communication: Parallel-visible (Andrew relays)
- Security level: Strict (SECRETS_SOP.md enforced)
- MCP status: James connected, Andy pending

**Workspace:**
- Location: `/home/ser/clawd`
- Git remote: None (local only, needs GitHub setup)
- Branch: master

## Validation

**Test workflows:**
1. Shed link building: ❌ Fail (sub-agent wrong format) → ✅ Pass (direct execute)
   - Expected: Sub-agent builds correct JSON state
   - Actual: Wrong field names, multiple failures
   - Notes: Direct execution faster, delegation needs improvement

2. Architecture documentation: ✅ Pass
   - Expected: Capture v0.1→v0.3 evolution
   - Actual: Created AGENT_ARCHITECTURE.md, CHANGELOG
   - Notes: Parallel work (James + Andy) valuable

3. Security protocol: ⏭️ Partial
   - Expected: No secrets in chat
   - Actual: Multiple password leaks during troubleshooting
   - Notes: SECRETS_SOP.md exists but behavior not internalized

**Metrics:**
- Task completion rate: 75% (shed eventually succeeded)
- Iteration cycles (avg): 4 (too high, need locked specs)
- Time to delivery: Variable (delegation slow, direct fast)
- Security violations: 3+
- User satisfaction: Medium (muddle but valuable insights)

**Success criteria met:** Partial (workflow works, but inefficient)

## Rollback Procedure

Revert to v0.2 (scheduling protocol, pre-shed-workflow):

\`\`\`bash
git checkout agent-arch-v0.2  # (if tag exists)
cp architecture-configs/v0.2-scheduling.json current-config.json
\`\`\`

**Verify:**
- [x] Main agent responsive
- [x] SCHEDULE.md accessible
- [ ] MCP (didn't exist in v0.2)

**Document:** Update changelog with failure reason

## Deployment

**Prerequisites:**
- [x] Git repo
- [x] Workspace `/home/ser/clawd`
- [x] Telegram bot token configured
- [x] Supabase MCP credentials (James only)
- [ ] Andy MCP connection (pending)

**Steps:**
1. [x] Config JSON in `architecture-configs/v0.3-shed-workflow.json`
2. [x] Workspace paths correct
3. [x] James agent platform (Clawdbot) running
4. [x] MCP tested (James connected)
5. [ ] Validation workflows (partial)
6. [ ] Tag stable (not yet - experimental)

**Post-deployment:**
- [ ] Monitor 24h (in progress)
- [x] Log issues (password leaks, delegation failures)
- [ ] Update docs (pending convergence with Andy)

## Changes in This Version

**Added:**
- Andy as spec guardian/QA agent
- SPEC vN workflow proposal
- Execution mode policy (direct vs delegate thresholds)
- Single front door architecture clarity
- MCP coordination layer

**Modified:**
- Communication from single agent to dual (with relay)
- Memory from simple to layered (daily + LTMEM + MCP + arch)
- Execution from "always delegate" to hybrid

**Removed:**
- N/A (additive version)

**Fixed:**
- Shed link building (via direct execute workaround)

**Known limitations:**
- Sub-agent delegation unreliable
- Security protocol not internalized
- Manual relay required (Andy pending MCP)
- Convergence protocol undefined
```

---

## Snapshot Storage

**Location:** `architecture-configs/snapshots/`

**Naming:** `snapshot-vX.Y-[name]-[YYYY-MM-DD].md`

**Git:** Tag each snapshot with version

```bash
git tag -a snapshot-v0.3 -m "Shed workflow test - experimental"
```

---

## Usage

### 1. Create Snapshot

```bash
cp docs/j-STATE_SNAPSHOT_TEMPLATE.md architecture-configs/snapshots/snapshot-v0.4-new-feature.md
# Fill in template sections
```

### 2. Reference in Changelog

```markdown
## v0.4 - New Feature (2026-04-10)

**Snapshot:** `architecture-configs/snapshots/snapshot-v0.4-new-feature.md`
**Status:** Experimental
...
```

### 3. Rollback if Needed

```bash
# Check available snapshots
ls architecture-configs/snapshots/

# Read rollback procedure
cat architecture-configs/snapshots/snapshot-v0.3-shed-workflow.md

# Execute rollback steps
git checkout snapshot-v0.3
```

---

**Status:** Template v1  
**Next:** Populate for each stable checkpoint  
**Convergence:** Align with Andy's template format
