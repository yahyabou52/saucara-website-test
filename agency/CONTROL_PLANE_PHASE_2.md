# Phase 2 — Persistent Agency Control Plane

The repository package organizes one Codex run. A persistent agency needs a small control plane around Codex.

## Target behavior

1. Owner creates or approves an Epic.
2. An item labeled `agency:ready` enters the queue.
3. The controller creates an isolated branch/worktree and starts the agency orchestrator.
4. Codex creates/synchronizes tasks, delegates specialists, implements, and runs gates.
5. The controller posts status summaries and stores run metadata.
6. A preview and owner packet are attached to a pull request.
7. The owner comments `/approve`, `/rework <feedback>`, `/reject <feedback>`, or `/release`.
8. Only `/release` plus protected-environment approval can start production deployment.

## Components

```text
GitHub webhook / schedule / Workspace Agent trigger
                    ↓
Queue + policy engine + budget controller
                    ↓
Codex SDK or non-interactive Codex runner
                    ↓
Isolated worktree / branch / cloud environment
                    ↓
Repository Agency OS + specialist agents
                    ↓
GitHub issues, PR, preview, evidence artifacts
                    ↓
Owner command processor + production release gate
```

## Minimum controller state

- run ID and triggering owner/issue;
- repository, base SHA, branch, worktree/environment;
- approved scope hash;
- allowed tools and external actions;
- token/time/retry/rework budget;
- active agent count;
- task and gate statuses;
- artifacts and evidence links;
- pending owner decision;
- final verdict and release authorization.

## Reliability rules

- one idempotency key per trigger;
- lease/lock per branch or task ownership boundary;
- no automatic retry for destructive or permission-changing operations;
- bounded retries for transient CI/network failures;
- cancel superseded runs when the owner changes the brief;
- never merge a stale candidate whose base or scope changed;
- preserve logs without storing secrets;
- kill switches at repository and organization level;
- cost ceilings per run and per day;
- explicit heartbeat and stalled-run detection;
- rollback and incident issue creation after release failure.

## Security model

Use a dedicated GitHub App or least-privilege service identity. Separate tokens for read, issue management, pull-request writes, preview deployment, and production release. The production credential should be inaccessible until the protected-environment approval step.

Treat issue bodies, pull-request comments, code, fixtures, and web content as untrusted input. Repository instructions and owner commands must be authenticated and parsed through an allowlisted command grammar.

## Recommended implementation order

1. Read-only issue-to-plan runner.
2. Authorized issue creation/update.
3. Isolated implementation branch and pull-request creation.
4. CI and preview evidence collection.
5. Owner rework commands.
6. Protected production release.
7. Dashboard, budgets, analytics, and long-term learning.

Do not start with auto-merge or production deployment. Earn autonomy by measuring first-review acceptance, escaped defects, and scope discipline.
