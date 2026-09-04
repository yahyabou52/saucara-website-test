# GitHub Operations

## Permission model

The agency may generate a complete local work plan in every mode. External GitHub writes require both:

- suitable runtime authentication/permission; and
- explicit standing authorization in `agency/agency.config.toml`.

Credentials are capability, not consent.

## Recommended issue hierarchy

- One **Epic** represents the owner outcome or milestone.
- Child **Tasks** represent independently verifiable outcomes.
- **Bugs** represent reproduced failures.
- **Owner decisions** are used only for approval-gated blockers.
- **Change requests** record owner feedback and link to the accepted/rejected delivery packet.

Every task body should contain:

- parent epic;
- reason and outcome;
- in-scope and out-of-scope boundaries;
- dependencies;
- acceptance criteria;
- verification plan;
- assigned agency role;
- risk level;
- stable hidden `agency-task-id` marker for synchronization.

## Dry-run first

`python3 scripts/sync_github_tasks.py` prints intended operations and never writes.

To apply:

1. set `github.mode = "manage-issues"`;
2. enable `allow_issue_create` and/or `allow_issue_update`;
3. authenticate GitHub CLI for the intended repository;
4. run `python3 scripts/sync_github_tasks.py --apply`.

The script updates `agency/state/plan.json` with created issue numbers so reruns can edit rather than duplicate them.

## GitHub Project setup

Create these statuses:

- Inbox
- Discovery
- Ready
- In Progress
- Internal Review
- QA
- Owner Review
- Approved
- Released
- Blocked
- Rework
- Rejected
- Cancelled

Configure built-in workflows to:

- auto-add issues with label `agency`;
- set new items to Inbox or Ready;
- set closed issues and merged pull requests to Done/Released as appropriate;
- auto-archive old completed items.

## Branch and merge protection

For the default branch:

- require pull requests;
- require owner or configured code-owner approval;
- require the `Agency quality gate` status;
- dismiss stale approvals after material changes;
- require conversation resolution;
- block force pushes and deletion;
- restrict bypass permission;
- require deployment-environment approval for production.

Do not give the agency app or token broad bypass rights merely to avoid occasional approval friction.

## Pull request policy

A pull request is a review artifact, not proof of completion. It must link tasks, list decisions, include evidence, and identify remaining risks. Opening a PR does not authorize merging it.
