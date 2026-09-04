---
name: agency-planner
description: Turn an approved charter into an executable architecture and task dependency graph. Use before substantial implementation to define interfaces, risks, tests, rollback, specialist ownership, GitHub-ready issues, and objective completion criteria without expanding scope.
---

# Agency Planner

Create a plan that can be executed and independently verified.

## Planning principles

- Plan from repository evidence, not a generic framework template.
- Preserve existing architecture unless change is necessary for the approved outcome.
- Prefer reversible decisions and narrow interfaces.
- Expose failure modes, migrations, and rollback before implementation.
- Each task must produce an observable outcome and be independently verifiable.
- Do not use planning to add attractive but unrequested features.

## Architecture pass

Ask `solution_architect` to provide, as applicable:

- current and proposed execution path;
- data ownership and interfaces;
- server/client and trust boundaries;
- state transitions and failure behavior;
- auth/authorization and privacy implications;
- third-party/provider contracts;
- migration and rollback;
- observability and support impact;
- alternatives considered and why rejected.

Use `docs_researcher` for version-specific facts. Use a security specialist before locking a sensitive design.

Record material choices in `agency/state/DECISIONS.md` using an ADR-style entry: context, decision, alternatives, consequences, reversibility, and evidence.

## Task graph

Write `agency/state/plan.json` with this shape:

```json
{
  "schema_version": 1,
  "epic": {
    "id": "EPIC-001",
    "title": "Outcome-oriented milestone title",
    "objective": "Owner-visible result",
    "status": "ready"
  },
  "tasks": [
    {
      "id": "TASK-001",
      "title": "Implement an independently verifiable outcome",
      "objective": "Why this task exists",
      "owner_agent": "frontend_engineer",
      "depends_on": [],
      "affected_paths": ["app/example"],
      "acceptance_criteria": ["Observable criterion"],
      "verification": ["Exact command or manual flow"],
      "risk": "low",
      "status": "ready",
      "labels": ["agency", "task", "area:frontend"],
      "github_issue": null
    }
  ]
}
```

## Task quality rules

Every task must:

- have a stable unique ID;
- map to the epic outcome;
- name one accountable agent role;
- list dependencies that form an acyclic graph;
- identify likely ownership paths or interfaces;
- include at least one testable acceptance criterion;
- include concrete automated or manual verification;
- classify risk as low, medium, high, or critical;
- be small enough to review without hiding multiple unrelated outcomes.

Create explicit tasks for tests, migration/rollback, documentation, and quality evidence when they are not naturally part of implementation.

## Sequencing

1. Foundation and contracts before consumers.
2. Migrations and compatibility strategy before dependent application behavior.
3. Core behavior before polish.
4. Tests alongside behavior, not at the end as a cosmetic step.
5. Stable candidate before independent review.
6. Review findings before owner handoff.

## Output review

Run `python3 scripts/validate_agency.py`. Fix invalid dependencies, missing criteria, duplicate IDs, or malformed records before work synchronization.
