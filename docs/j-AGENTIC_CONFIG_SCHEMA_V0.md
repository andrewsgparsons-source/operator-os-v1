# Agentic Configuration Schema v0
## Parametric Agent Team Configuration Format

**Purpose:** Define configurable parameters for deploying custom agent teams  
**Author:** James  
**Date:** 2026-04-03  
**Status:** DRAFT v0 (will evolve)

---

## Overview

Like a shed configurator takes parameters (width, depth, roof type) → custom building,  
this schema takes parameters (roles, delegation mode, security level) → custom agent team.

**Use cases:**
- Deploy TandemAI for different users
- Configure teams for different domains (business, personal, creative)
- Version control team architectures
- A/B test different configurations

---

## Schema Structure

```json
{
  "team": {
    "id": "string",
    "version": "string",
    "name": "string",
    "created": "ISO8601 timestamp",
    "gitRebootPoint": "git commit hash or tag"
  },
  "agents": {
    "main": { /* Main agent config */ },
    "guardian": { /* Spec guardian config */ },
    "specialists": [ /* Array of specialist agents */ ]
  },
  "communication": { /* How agents coordinate */ },
  "execution": { /* Direct vs delegate policy */ },
  "security": { /* Secrets, approvals, audit */ },
  "memory": { /* Storage layers */ },
  "taskManagement": { /* Scheduling, tracking */ }
}
```

---

## Field Definitions

### `team` (Object)

**Identifies this configuration uniquely**

```json
{
  "team": {
    "id": "tandem-andrew-v0.3",
    "version": "0.3",
    "name": "shed-workflow",
    "created": "2026-04-03T07:12:00Z",
    "gitRebootPoint": "agent-arch-v0.3"
  }
}
```

**Fields:**
- `id` (string, required): Unique identifier
- `version` (string, required): Semantic version (X.Y format)
- `name` (string, optional): Human-readable name
- `created` (ISO8601 timestamp, required): When config created
- `gitRebootPoint` (string, optional): Git commit/tag for rollback

---

### `agents` (Object)

**Defines agent roles and capabilities**

#### `agents.main` (Object)

**The primary interface agent (always required)**

```json
{
  "main": {
    "role": "coordinator-executor-hybrid",
    "delegationMode": "auto-context-dependent",
    "availabilityTarget": "always-responsive",
    "workspace": "/home/ser/clawd",
    "platform": "clawdbot-gateway",
    "channel": "telegram",
    "executionStrategy": {
      "routine": "direct",
      "complex": "delegate",
      "thresholdMinutes": 10
    },
    "specialistAgents": [
      "shed-link-builder",
      "animation-capture",
      "researcher"
    ]
  }
}
```

**Fields:**
- `role` (enum, required): Main agent's role
  - Options: `"coordinator"`, `"executor"`, `"coordinator-executor-hybrid"`
- `delegationMode` (enum, required): When to delegate
  - Options: `"always"`, `"never"`, `"auto-context-dependent"`, `"threshold-based"`
- `availabilityTarget` (string, required): Availability commitment
  - Examples: `"always-responsive"`, `"best-effort"`, `"scheduled-hours"`
- `workspace` (path, required): Root workspace directory
- `platform` (string, required): Execution platform
  - Examples: `"clawdbot-gateway"`, `"openai-assistants"`, `"custom"`
- `channel` (string, required): Primary communication channel
  - Examples: `"telegram"`, `"whatsapp"`, `"slack"`, `"api"`
- `executionStrategy` (object, optional): Routing policy
  - `routine` (enum): `"direct"` or `"delegate"`
  - `complex` (enum): `"direct"` or `"delegate"`
  - `thresholdMinutes` (number): Delegation threshold
- `specialistAgents` (array of strings, optional): Available specialists

---

#### `agents.guardian` (Object, Optional)

**Spec guardian / QA agent (if using SPEC vN workflow)**

```json
{
  "guardian": {
    "role": "spec-guardian-qa-security",
    "workspace": "/home/andy/.openclaw",
    "platform": "clawdbot-gateway",
    "securityLevel": "strict",
    "outputFormat": "locked-specs",
    "qaMode": "pass-fail-vs-spec",
    "connectionStatus": "connected"
  }
}
```

**Fields:**
- `role` (string, required): Guardian's responsibilities
- `workspace` (path, required): Workspace directory
- `platform` (string, required): Execution platform
- `securityLevel` (enum, required): Security enforcement
  - Options: `"strict"`, `"moderate"`, `"development"`
- `outputFormat` (enum, required): How specs are delivered
  - Options: `"locked-specs"`, `"recommendations"`, `"audit-only"`
- `qaMode` (enum, required): QA approach
  - Options: `"pass-fail-vs-spec"`, `"scoring"`, `"manual-review"`
- `connectionStatus` (enum, required): Operational state
  - Options: `"connected"`, `"pending"`, `"offline"`

---

#### `agents.specialists` (Array, Optional)

**Domain-specific specialist agents**

```json
{
  "specialists": [
    {
      "id": "shed-link-builder",
      "domain": "parametric-configurator",
      "capabilities": ["state-encoding", "url-generation"],
      "model": "claude-sonnet-4",
      "contextFiles": [
        "docs/SHED-LINK-BUILDER.md",
        "prompts/shed-link-builder.md"
      ],
      "maxConcurrent": 3
    },
    {
      "id": "researcher",
      "domain": "web-research",
      "capabilities": ["search", "summarize", "synthesize"],
      "model": "gpt-4-turbo",
      "tools": ["web_search", "web_fetch"],
      "maxConcurrent": 5
    }
  ]
}
```

**Fields per specialist:**
- `id` (string, required): Unique identifier
- `domain` (string, required): Area of expertise
- `capabilities` (array of strings, required): What it can do
- `model` (string, optional): LLM to use
- `contextFiles` (array of paths, optional): Pre-loaded context
- `tools` (array of strings, optional): Tool access
- `maxConcurrent` (number, optional): Parallel instance limit

---

### `communication` (Object)

**How agents coordinate and interface with user**

```json
{
  "communication": {
    "flow": "parallel-visible",
    "convergenceMode": "discussion",
    "platform": "telegram-group",
    "groupId": "-5257254634",
    "directAgentToAgent": false,
    "relayVia": "andrew-forwarding",
    "coordinationLayer": {
      "enabled": true,
      "backend": "supabase-mcp",
      "visibility": "queryable-by-user"
    }
  }
}
```

**Fields:**
- `flow` (enum, required): User-facing communication pattern
  - Options: `"single-front-door"`, `"parallel-visible"`, `"multiplexed"`
- `convergenceMode` (enum, required): How parallel work merges
  - Options: `"automated"`, `"discussion"`, `"vote"`, `"human-decision"`
- `platform` (string, required): Communication platform
- `groupId` (string, optional): Platform-specific group ID
- `directAgentToAgent` (boolean, required): Can agents message each other directly?
- `relayVia` (string, optional): If relayed, who relays?
- `coordinationLayer` (object, optional): Behind-scenes coordination
  - `enabled` (boolean): Use coordination layer?
  - `backend` (string): Technology (e.g., `"supabase-mcp"`, `"redis"`, `"file"`)
  - `visibility` (enum): User access to coordination log
    - Options: `"hidden"`, `"queryable-by-user"`, `"always-visible"`

---

### `execution` (Object)

**Execution mode policy**

```json
{
  "execution": {
    "defaultMode": "hybrid",
    "delegationPolicy": {
      "thresholds": {
        "timeMinutes": 10,
        "complexityScore": 7,
        "uncertaintyLevel": "high"
      },
      "delegateIf": "any-threshold-met",
      "exceptions": [
        {
          "taskType": "security-critical",
          "forceMode": "direct-with-qa"
        }
      ]
    },
    "asyncFirst": true,
    "blockingApprovalRequired": [
      "external-communication",
      "financial-transaction",
      "credential-rotation",
      "file-deletion"
    ]
  }
}
```

**Fields:**
- `defaultMode` (enum, required): Base execution strategy
  - Options: `"direct"`, `"delegate"`, `"hybrid"`
- `delegationPolicy` (object, required if hybrid/delegate):
  - `thresholds` (object): Delegation triggers
    - `timeMinutes` (number): Time estimate threshold
    - `complexityScore` (number): 0-10 complexity scale
    - `uncertaintyLevel` (enum): `"low"`, `"medium"`, `"high"`
  - `delegateIf` (enum): Threshold logic
    - Options: `"all-thresholds-met"`, `"any-threshold-met"`
  - `exceptions` (array): Override rules
    - `taskType` (string): Task category
    - `forceMode` (string): Execution mode override
- `asyncFirst` (boolean, required): Prefer async execution?
- `blockingApprovalRequired` (array of strings, required): Actions needing approval

---

### `security` (Object)

**Security policies and enforcement**

```json
{
  "security": {
    "credentialSharing": "privatebin-per-agent",
    "secretsPolicy": "SECRETS_SOP.md",
    "incidentProtocol": "SECRETS_INCIDENT.md",
    "auditLog": {
      "enabled": true,
      "location": "memory/audit-YYYY-MM-DD.jsonl",
      "retention": "365days"
    },
    "approvalGates": {
      "externalActions": "always",
      "internalActions": "risk-based",
      "configChanges": "always"
    },
    "recentIncidents": [
      "2026-04-02: Password leak during Supabase setup",
      "2026-04-03: Password posted in chat (shed workflow)"
    ]
  }
}
```

**Fields:**
- `credentialSharing` (string, required): Method for sharing secrets
  - Examples: `"privatebin-per-agent"`, `"1password-cli"`, `"vault"`
- `secretsPolicy` (path, required): Policy document reference
- `incidentProtocol` (path, required): Response playbook reference
- `auditLog` (object, required): Logging configuration
  - `enabled` (boolean): Log all actions?
  - `location` (path template): Where logs stored
  - `retention` (duration): How long to keep
- `approvalGates` (object, required): When approval needed
  - `externalActions` (enum): `"always"`, `"never"`, `"risk-based"`
  - `internalActions` (enum): Same options
  - `configChanges` (enum): Same options
- `recentIncidents` (array of strings, optional): Security history

---

### `memory` (Object)

**Memory and persistence layers**

```json
{
  "memory": {
    "dailyLogs": {
      "enabled": true,
      "path": "memory/YYYY-MM-DD.md",
      "retention": "indefinite"
    },
    "longTerm": {
      "enabled": true,
      "path": "MEMORY.md",
      "access": "main-session-only",
      "privacySensitive": true
    },
    "sharedMemory": {
      "enabled": true,
      "provider": "supabase-mcp",
      "project": "hgulmowlfeydnmhkdogl",
      "region": "eu-central-1",
      "tables": ["memories", "decisions", "specs"],
      "agentAccess": {
        "james": "read-write",
        "andy": "read-write"
      }
    },
    "architectureMemory": {
      "enabled": true,
      "configsPath": "architecture-configs/",
      "changelogPath": "ARCHITECTURE_CHANGELOG.md",
      "versionControl": "git"
    }
  }
}
```

**Fields:**
- `dailyLogs`, `longTerm`, `sharedMemory`, `architectureMemory` (objects): Memory layers
- Each layer has:
  - `enabled` (boolean, required)
  - Layer-specific fields (paths, providers, access controls)

---

### `taskManagement` (Object)

**Task scheduling and tracking**

```json
{
  "taskManagement": {
    "schedule": {
      "enabled": true,
      "path": "SCHEDULE.md",
      "format": "structured-markdown"
    },
    "kanban": {
      "enabled": true,
      "path": "shed-project-board/data/cards.json",
      "url": "https://andrewsgparsons-source.github.io/shed-project-board/"
    },
    "automation": {
      "level": "manual-heartbeat",
      "cronEnabled": false,
      "heartbeatIntervalMinutes": 30
    }
  }
}
```

**Fields:**
- `schedule` (object, required): Structured task list
- `kanban` (object, optional): Visual board
- `automation` (object, required): How tasks execute
  - `level` (enum): `"manual"`, `"manual-heartbeat"`, `"cron"`, `"event-driven"`
  - `cronEnabled` (boolean): Use cron jobs?
  - `heartbeatIntervalMinutes` (number): Polling frequency

---

## Complete Example

See: `architecture-configs/v0.3-shed-workflow.json` for full working example.

---

## Usage

### 1. Create Config

```json
{
  "team": {
    "id": "my-team-v1",
    "version": "1.0",
    "name": "marketing-automation",
    "created": "2026-04-10T10:00:00Z"
  },
  "agents": { /* ... */ },
  /* ... rest of config ... */
}
```

### 2. Validate Config

```bash
# (Future: schema validation tool)
validate-config my-team-v1.json
```

### 3. Deploy Config

```bash
# (Future: deployment tool)
deploy-tandem-config my-team-v1.json
```

### 4. Version Control

```bash
git add architecture-configs/my-team-v1.json
git commit -m "Add marketing automation team config"
git tag team-v1.0
```

---

## Evolution Strategy

**v0 (Current):** Define core schema, test with Andrew's config  
**v1 (Future):** Add validation, deployment tooling  
**v2 (Future):** Template library, wizard for config creation  
**v3 (Future):** Marketplace of proven configs

---

**Status:** DRAFT v0  
**Next:** Validate with real deployments, refine based on usage  
**Convergence:** Merge with Andy's schema version
