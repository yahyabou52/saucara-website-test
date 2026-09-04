---
name: specialist-router
description: Select and coordinate the smallest useful set of Codex expert agents and external skills for a web task. Use when the owner asks to call the right experts, improve an area, or run an agency team without manually choosing roles.
---

# Specialist Router

Route work by risk and evidence. Do not activate every available skill.

## Inputs

- project charter and task graph;
- repository stack and versions;
- changed or affected systems;
- risk register;
- available custom agents and installed skills;
- configured concurrency and permission limits.

## Selection process

1. Classify the work: product, UX, frontend, backend, data, integration, security, performance, QA, release, or incident.
2. Identify the unresolved question or required artifact for each specialist.
3. Select one primary specialist per responsibility.
4. Add an independent reviewer whose incentives differ from the builder.
5. Select external skills only when they contribute domain knowledge not already covered.
6. Avoid overlapping orchestrators and duplicate reviews during implementation.
7. Run review skills sequentially when their findings depend on a stable candidate.

Use `agency/ROUTING_MATRIX.md` as the default map.

## Delegation packet

Every spawned specialist receives:

- role and narrow objective;
- owner outcome and relevant acceptance criteria;
- exact files, flows, diff, logs, or documents to inspect;
- allowed write scope or explicit read-only instruction;
- required evidence;
- output format;
- stop condition;
- reminder not to expand scope.

## Concurrency

Parallelize:

- repository exploration;
- product, UX, and architecture analysis that can be reconciled;
- independent documentation verification;
- security/accessibility/performance review of a stable candidate;
- disjoint test and log analysis.

Serialize or isolate:

- overlapping code edits;
- schema and consumers sharing a changing contract;
- global styles, tokens, routing, lockfiles, migrations, generated files;
- release and deployment state.

Respect `max_parallel_read_agents` and `max_parallel_write_agents`. If parallel writers are genuinely useful, assign non-overlapping paths and separate worktrees/branches before spawning them.

## Routing record

Append a concise entry to `agency/state/DECISIONS.md`:

- specialists selected;
- question assigned to each;
- why other obvious roles were not needed;
- concurrency/isolation plan;
- expected gates.

## Completion

Return a consolidated route to the agency lead. Specialists do not communicate competing plans directly to the owner; the lead resolves them and owns the decision.
