# Agency Workflow

## Gate 0 — Intake

**Lead:** agency lead  
**Specialists:** product strategist, repository explorer, documentation researcher

Outputs:

- owner outcome and constraints;
- current repository truth;
- scope and non-goals;
- assumptions and approval-gated unknowns;
- measurable acceptance criteria;
- project charter.

Proceed without interruption when missing information has a safe, reversible default. Escalate only when the decision crosses a boundary in `DECISION_RIGHTS.md`.

## Gate 1 — Product and experience

**Lead:** product strategist or UX director

Outputs:

- target users and core job;
- information architecture and primary journeys;
- content hierarchy;
- edge states and responsive behavior;
- accessibility and localization implications;
- design direction or constraints.

This gate may be lightweight for backend-only work.

## Gate 2 — Engineering plan

**Lead:** solution architect

Outputs:

- architecture and data-flow decision;
- affected modules and interfaces;
- dependency and migration strategy;
- threat boundaries and failure modes;
- task graph with acceptance criteria;
- testing and rollback plan.

The plan must fit the approved scope. An architect may challenge a risky implementation but may not silently invent a larger product.

## Gate 3 — Work synchronization

**Lead:** agency lead  
**Skill:** `github-work-manager`

Outputs:

- `agency/state/plan.json`;
- dry-run or authorized GitHub issues;
- dependencies and labels;
- one owner-decision issue only when required.

GitHub Projects should use built-in auto-add and status workflows where possible rather than custom automation for every transition.

## Gate 4 — Implementation

**Lead:** implementation manager  
**Specialists:** frontend engineer, backend engineer, test engineer

Rules:

- execute dependency order;
- one write owner for overlapping code;
- use isolated branches/worktrees for genuinely independent work;
- run targeted checks after each task;
- preserve unrelated changes;
- update plan state and decisions as work progresses.

## Gate 5 — Independent quality board

**Lead:** independent reviewer  
**Specialists:** QA, accessibility, security, performance

The board receives the owner brief, acceptance criteria, diff, and test evidence. It does not rely only on the builder's summary.

Possible verdicts:

- `PASS` — no blocker or critical issue; evidence is sufficient.
- `PASS_WITH_EXCEPTIONS` — documented non-blocking limitations are owner-visible.
- `REWORK` — bounded defects must return to implementation.
- `BLOCKED` — an external dependency or owner decision prevents completion.

## Gate 6 — Owner review

The agency lead produces one delivery packet. Internal logs remain available but are not dumped into the owner summary.

Owner verdicts:

- `APPROVE`
- `REQUEST_CHANGES`
- `REJECT_AND_RETHINK`

## Gate 7 — Release

**Lead:** release manager

Requires explicit release authorization. Re-run required checks on the final release candidate, verify migration and rollback procedures, and preserve an audit trail of what was merged and deployed.

## Gate 8 — Retrospective

Record:

- what the agency predicted correctly;
- defects caught before owner review;
- defects the owner caught;
- unnecessary work or scope drift;
- failed or flaky checks;
- new repository-specific rules worth preserving.
