# j-V3_BACKLOG

**Owner:** James  
**Scope:** Post-v2 enhancements for improved agent collaboration and visibility

---

## Naming Convention
- James-authored docs: prefix with `j-`
- Andy-authored docs: prefix with `a-`

---

## V3 Feature Proposals

### FEAT-CTX-001 — Context Budget Monitoring & Mutual Reorientation
**Status:** Proposed  
**Priority:** High  
**Detailed spec:** `j-CONTEXT_MONITORING_FEATURE.md`

**Problem:**
- Context compression causes agent disorientation
- Lost thread of active work
- Manual reorientation overhead for human

**Solution:**
- Real-time context budget visibility per agent (🟢🟡🔴⚪)
- Compression event logging with state snapshots
- Cross-agent reorientation assistance
- Predictive warnings ("~12 exchanges until compression")

**Implementation phases:**
1. Monitoring display (read-only)
2. Event logging with state capture
3. Active reorientation (agent briefs agent)
4. Predictive warnings

**Success metrics:**
- Zero "lost thread" incidents after compression
- Sub-30-second reorientation time
- >80% of compressions anticipated

---

### FEAT-AWR-001 — Agent Self-Awareness & Capability Discovery
**Status:** Proposed  
**Priority:** High  
**Origin:** 2026-04-03 discussion - divergent setup instructions revealed awareness gap

**Problem:**
Agents currently lack knowledge of:
- Their own runtime environment (OS, machine specs, Clawdbot version)
- Available tools/skills/capabilities
- Resource limits (token budget, rate limits)
- Session context (group vs DM, who's present)
- Other agents' capabilities and availability
- Load balancing information

**Real-world impact:**
- MCP setup instructions diverged (James: gateway config, Andy: repo setup)
- Couldn't coordinate effectively without knowing each other's context
- Poor delegation decisions (don't know who has which tools)
- Can't predict which agent is better suited for a task

**Proposed solution:**

#### 1. Agent Identity & Environment Profile
Each agent should expose/query:
```json
{
  "agentId": "james-main",
  "agentName": "James",
  "version": "clawdbot@1.2.3",
  "runtime": {
    "os": "Linux 6.6.87.2-microsoft-standard-WSL2",
    "node": "v22.22.0",
    "machine": "DESKTOP-8E03FD7",
    "workspace": "/home/ser/clawd"
  },
  "model": {
    "primary": "anthropic/claude-sonnet-4-5-20250929",
    "thinking": "low",
    "reasoning": false
  },
  "capabilities": {
    "tools": ["exec", "browser", "web_search", "memory_search"],
    "skills": ["github", "weather", "video-frames", "tmux"],
    "specialties": ["parametric-model", "shed-configurator"]
  },
  "limits": {
    "contextBudget": 200000,
    "currentUsage": 35000,
    "rateLimits": {}
  },
  "sessionContext": {
    "channel": "telegram",
    "chatType": "group",
    "chatId": "-5257254634",
    "participants": ["Andrew", "James", "Andy"]
  }
}
```

#### 2. Capability Discovery Protocol
Agents can query each other:
- "What tools do you have access to?"
- "Can you run browser automation?"
- "What's your current load?"
- "Are you in the same chat/session as me?"

#### 3. Delegation Intelligence
Use awareness for better routing:
- "Andy has direct database access in operator-os-v1 repo, delegate DB tasks to him"
- "James has Chrome remote debugging, delegate UI testing to him"
- "Andy is at 95% context, don't delegate complex tasks right now"

#### 4. Parametric Configuration
**User-controlled awareness levels:**
- **Full transparency:** All agents see each other's full profiles
- **Need-to-know:** Only share capabilities relevant to current task
- **Privacy mode:** Minimal sharing (just availability status)
- **Specialty-based:** Share domain expertise but not infrastructure details

**Example use cases:**
- Security-sensitive tasks: limit awareness
- Collaborative design: full transparency beneficial
- Public-facing agents: privacy mode default

---

## Implementation Strategy

### Phase 1: Self-Discovery (Introspection)
- [ ] Each agent generates own profile on startup
- [ ] Query Clawdbot version, runtime info
- [ ] Enumerate available tools/skills
- [ ] Detect session context (channel, participants)
- [ ] Store in memory or expose via MCP

### Phase 2: Profile Sharing (Cross-Agent Visibility)
- [ ] Add `agent_profiles` table to Supabase
- [ ] Agents publish profiles on session start
- [ ] Update on significant changes (tool added, context shift)
- [ ] Query protocol: `getAgentProfile(agentId)`

### Phase 3: Capability-Based Routing
- [ ] Decision logic: "Which agent should handle this?"
- [ ] Consider: tools available, current load, specialty match
- [ ] Suggest delegation: "Andy is better suited for X"

### Phase 4: Parametric Control
- [ ] Add awareness level setting to config schema
- [ ] UI controls in Solution Planner
- [ ] Per-task awareness overrides
- [ ] Privacy boundaries enforcement

---

## Security & Privacy Considerations

**What NOT to share:**
- Credentials, API keys, passwords
- Private user data (unless explicitly scoped to shared task)
- Workspace-specific secrets (e.g., Whelpley Farm details)

**What's safe to share:**
- Tool/skill availability
- Model configs
- Performance metrics (token usage, latency)
- Session metadata (chat type, participants)

**Privacy tiers (configurable):**
1. **Public profile:** Name, role, specialty areas
2. **Team profile:** + tools, model, availability
3. **Full profile:** + resource usage, session context, detailed capabilities

---

## Open Questions

1. **How much awareness is optimal?**
   - Too little: poor coordination, duplicate work
   - Too much: information overload, privacy concerns

2. **Update frequency?**
   - Real-time vs periodic refresh
   - Push vs pull model

3. **Storage location?**
   - Supabase (persistent, queryable)
   - In-memory (ephemeral, low overhead)
   - Hybrid (core profile persistent, session data ephemeral)

4. **Cross-instance awareness?**
   - Should parametric-model James know about main James?
   - Family of agents vs isolated instances

5. **Failure modes?**
   - What if profile query fails?
   - Graceful degradation strategy
   - Stale profile detection

---

## Success Criteria

**For v3 acceptance:**
- ✅ Agents can introspect own environment
- ✅ Agents can query each other's capabilities
- ✅ Delegation decisions improved (measurable reduction in failed handoffs)
- ✅ No setup instruction divergence (like MCP example)
- ✅ Privacy controls enforced (sensitive data not shared)
- ✅ User can configure awareness levels per agent/task

---

## Related Documents
- `a-V3_BACKLOG.md` (Andy's v3 proposals)
- `j-CONTEXT_MONITORING_FEATURE.md` (companion feature)
- `AGENTIC_CONFIG_SCHEMA_V0.md` (will need schema extension)
- `j-FOUNDER_ARCHITECTURE_SPEC_V2.md` (v2 baseline)

---

**Last updated:** 2026-04-03 09:04 GMT  
**Next:** Await Andy's v3 backlog, compare approaches, converge on priorities
