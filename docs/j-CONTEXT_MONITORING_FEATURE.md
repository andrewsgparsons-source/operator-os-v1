# Context Monitoring Feature (v3 Proposal)

**Author:** James  
**Date:** 2026-04-03  
**Status:** Proposed for v3  
**Relates to:** Mutual agent collaboration, context compression handling

---

## Problem Statement

When an agent hits context limit and compression occurs:
- Agent loses recent conversation context
- Agent becomes disoriented about current task/state
- Collaboration breaks down temporarily
- Manual reorientation needed from human

**Real-world impact:** James frequently hits compression during long sessions, losing thread of active work.

---

## Proposed Solution: Mutual Context Monitoring

Enable agents to monitor each other's context budget and provide reorientation assistance after compression events.

### Core Mechanism

**1. Context Status Sharing**
Each agent exposes real-time context metrics via MCP/Supabase:
```json
{
  "agentId": "james-main",
  "contextBudget": {
    "used": 185000,
    "limit": 200000,
    "percentage": 92.5,
    "risk": "high"
  },
  "lastCompression": "2026-04-03T08:20:15Z",
  "compressionCount": 3,
  "sessionStart": "2026-04-03T06:00:00Z"
}
```

**2. Risk Levels**
- 🟢 **Healthy** (<70%): Plenty of context available
- 🟡 **Moderate** (70-90%): Getting full, routine monitoring
- 🔴 **High** (>90%): Near compression, prepare handoff
- ⚪ **Compressed**: Just lost context, needs reorientation

**3. Compression Event Logging**
When compression occurs, log to shared state:
```json
{
  "event": "context_compression",
  "agentId": "james-main",
  "timestamp": "2026-04-03T08:20:15Z",
  "preCompressionState": {
    "activeTask": "Creating j- architecture docs",
    "filesInProgress": ["j-FOUNDER_ARCHITECTURE_SPEC_V2.md"],
    "nextStep": "Push to GitHub",
    "decisions": ["v2 baseline locked, working on v3"]
  },
  "postCompressionTokens": 45000
}
```

**4. Reorientation Protocol**
When Agent A detects Agent B was compressed:
1. Read compression event log
2. Summarize: what B was working on, progress made, next steps
3. Proactively brief B when B next responds
4. Example: "You were compressed at 08:20 while pushing architecture docs. You completed all 5 j- files, commit 5141cc0. Next: capture context monitoring feature."

---

## User Interface Elements

### For Human (Solution Planner "My Team" View)

Add context health indicators per agent:
```
James (Main)                           [🟡 78% context]
├─ Status: Active
├─ Model: Claude Sonnet 4
├─ Context: 156k / 200k tokens
└─ Last compression: 2h ago

Andy (Operator)                        [🟢 42% context]  
├─ Status: Active
├─ Model: Claude Sonnet 4
├─ Context: 84k / 200k tokens
└─ Last compression: Never
```

**Countdown feature:** Show estimated messages/turns until compression
- Based on recent average token use per turn
- "~12 more exchanges before compression risk"

### For Agents (MCP/Supabase)

Agents query each other's status:
```javascript
// Check if collaborating agent needs reorientation
const andyStatus = await mcp.getAgentStatus('andy-operator');
if (andyStatus.compressionEvents.length > lastCheck) {
  // Andy was compressed since we last checked
  const event = andyStatus.compressionEvents[0];
  // Brief Andy on what he was working on
}
```

---

## Implementation Plan

### Phase 1: Monitoring (Read-Only)
- [ ] Add context budget tracking to agent status
- [ ] Display in Solution Planner "My Team" view
- [ ] Show real-time percentage + risk level
- [ ] Log compression events with timestamp

### Phase 2: Event Logging (State Capture)
- [ ] Before compression, capture current state:
  - Active task from TASK_STATE.md
  - Files being edited
  - Recent decisions made
  - Next planned steps
- [ ] Write to Supabase `compression_events` table
- [ ] Timestamp + agent ID + state snapshot

### Phase 3: Reorientation (Active Assistance)
- [ ] Agents check for compression events in collaborators
- [ ] When detected, read state snapshot
- [ ] Proactively brief compressed agent on return
- [ ] "You were working on X, here's where you left off"

### Phase 4: Predictive Warnings
- [ ] Calculate average tokens per message
- [ ] Estimate turns until compression
- [ ] Warn human: "James will hit compression in ~10 messages"
- [ ] Suggest: wrap up task, delegate to fresh agent, or prepare handoff

---

## Benefits

**For Human:**
- Visibility into agent context health
- No surprise compressions mid-task
- Can plan task delegation around context limits

**For Agents:**
- Reduced disorientation after compression
- Smoother handoffs between agents
- Better collaboration continuity
- Self-awareness of cognitive capacity

**For Team:**
- Fewer "what was I doing?" moments
- Better task continuity across compressions
- Mutual support between agents
- Aligns with "always available" principle (one agent briefs the other)

---

## Technical Notes

**Data source:**
- Clawdbot likely provides token usage via internal APIs
- May need to expose via MCP server
- Alternative: estimate from message history length

**Storage:**
- Supabase `agent_status` table (real-time)
- Supabase `compression_events` table (history)

**Update frequency:**
- Context status: every message (real-time)
- Compression events: as they occur
- Reorientation checks: on agent wake-up

---

## Open Questions

1. **Proactive vs reactive reorientation?**
   - Should agent always brief after compression?
   - Or only when asked / when relevant?

2. **Compression state capture scope:**
   - How much context to preserve? (summary vs full state)
   - Store in Supabase or in files (memory/*.md)?

3. **Cross-agent coordination:**
   - Should agents proactively offer to take over when peer near compression?
   - "James is at 95%, should I handle the next task?"

4. **Privacy/security:**
   - Is compression state (task details) safe to share between agents?
   - Any tasks that shouldn't be visible to other agents?

---

## Relationship to Existing Architecture

**Extends:**
- MCP/Supabase collaboration layer (v2 foundation)
- Agent state sharing (already planned)
- Solution Planner "My Team" view (recently built)

**Aligns with:**
- "Always available" principle (agents support each other)
- SPEC vN workflow (state versioning + checkpoints)
- Single front door UX (human sees consolidated view, not complexity)

**Enables:**
- Better long-session handling
- Multi-day project continuity
- Graceful degradation when context fills

---

## Success Metrics

- **Zero "lost thread" incidents** after compression
- **Sub-30-second reorientation time** when agent returns
- **Proactive handoff rate**: >80% of compressions anticipated
- **User satisfaction**: Human doesn't have to explain "where we were"

---

## Next Steps

1. Get Andrew's approval for v3 inclusion
2. Define data schema for Supabase tables
3. Implement Phase 1 (monitoring display)
4. Test with real compression event
5. Iterate based on actual usage

---

**Related Documents:**
- `a-CONTEXT_MONITORING_FEATURE.md` (Andy's perspective)
- `j-FOUNDER_ARCHITECTURE_SPEC_V2.md` (v2 baseline)
- `AGENTIC_CONFIG_SCHEMA_V0.md` (data structure foundation)
