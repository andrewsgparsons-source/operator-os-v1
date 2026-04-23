# Global Configurator Chronology Protocol (V1)

## Purpose
Use Global Configurator as the single source of truth for operational chronology.

## Scope
Applies to both Andy and James.

## Required behavior
1. For every meaningful action/decision/incident, append one chronology entry node.
2. Use timestamp-first labels: `YYYY-MM-DD HH:MM — <title>`.
3. Keep entry resource note structure:
   - What happened
   - Why it matters (impact)
   - Next action
4. Append-only: do not rewrite old entries; add correction/follow-up as a new node.
5. If an entry is missed, add a catch-up entry before starting new work.

## Placement
Create/maintain a dedicated branch in Global Configurator:
- Root: `Chronology & Ops Log`
- Children: one node per event

## Cadence guardrails
- Minimum: update before session close.
- Mandatory: update before creating any new lock release.

## Suggested quality tags (optional in note text)
- kind: milestone | decision | incident | insight
- confidence: high | medium | low
- owner: andy | james | both

## Starter import pack
A ready-made import pack is available at:
`prototypes/data/snapshots/global-configurator-chronology-catchup-2026-04-23.v1.json`

Import recommendation:
- Use Option 3 under your chosen top-level operations node.
