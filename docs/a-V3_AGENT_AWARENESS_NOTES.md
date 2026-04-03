# a-V3_AGENT_AWARENESS_NOTES

Owner: Andy
Status: Draft (captured from Andrew live reflection)

## Prompting Insight
Current tandem operation exposed an ambiguity: agents may lack reliable awareness of
- which machine/runtime they are on,
- which OpenClaw/Clawdbot version is running,
- which config path is canonical,
- which peer agent has which capabilities and current state.

This causes instruction divergence, especially in mixed-machine workflows.

## Problem Statement
Without explicit runtime/peer awareness, agents can produce valid instructions for the wrong environment,
creating friction and potential safety errors.

## V3 Candidate Requirement: AGENT-AWARE-001
**Title:** Runtime Self-Awareness Panel

Each agent should have a standard introspection block available in-session:
- runtime host/machine ID
- OS + shell context
- OpenClaw version
- active repo path(s)
- active config source of truth path(s)
- current channel/session binding
- memory backend status

## V3 Candidate Requirement: AGENT-AWARE-002
**Title:** Peer Awareness Contract

For each collaborating agent, expose a minimal capability card:
- agent ID and role
- machine/runtime location class (local/remote)
- tool availability profile
- memory/shared-backend connectivity status
- last sync timestamp

## V3 Candidate Requirement: AGENT-AWARE-003
**Title:** Awareness Policy Levels (Parametric)

Configurable awareness depth by context:
1. **Minimal:** identity + role only
2. **Operational:** runtime + tool + connectivity status
3. **Full:** detailed environment and config metadata

Use-case rationale:
- Some contexts benefit from strict isolation/minimal exposure.
- Others require richer awareness for reliability and reduced operator overhead.

## Benefits
- Fewer wrong-environment instructions
- Faster debugging and triage
- Lower cognitive load on human relay/operator
- Better cross-agent coordination quality

## Risks / Trade-offs
- Over-sharing environment details may increase security exposure.
- Must balance collaboration utility vs least-information principle.

## Initial Design Direction
- Default to **Operational** awareness in trusted private workflows.
- Use **Minimal** awareness in broader/shared contexts.
- Promote to **Full** only when explicitly approved.

## Suggested Next Step
Add these as backlog items in `a-V3_BACKLOG.md` under an "Agent Awareness" section and define acceptance tests.
