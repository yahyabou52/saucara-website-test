---
name: github-work-manager
description: Convert the agency plan into safe, idempotent GitHub issues and project-ready work records. Use after planning or during status updates. Default to dry-run and apply writes only when the exact GitHub permissions are enabled in agency.config.toml.
---

# GitHub Work Manager

Manage work without treating authentication as authorization.

## Required checks

1. Read `[github]` in `agency/agency.config.toml`.
2. Validate `agency/state/plan.json`.
3. Inspect current repository identity and GitHub authentication only when an apply operation is authorized.
4. Preserve stable task IDs and existing issue numbers.
5. Never create duplicates to hide a failed update.

## Dry-run mode

Run:

```bash
python3 scripts/sync_github_tasks.py
```

Review the intended creates/updates, missing labels, and repository target. Dry-run is always allowed because it changes only local output.

## Apply mode

Apply only when:

- `github.mode = "manage-issues"`;
- the matching `allow_issue_create` or `allow_issue_update` flag is true;
- runtime permission permits the action;
- the repository target is unambiguous;
- the plan validates.

Then run:

```bash
python3 scripts/sync_github_tasks.py --apply
```

Do not enable config flags on the owner's behalf. Standing authorization must already exist.

## Issue policy

- One epic for the owner-visible milestone.
- One issue per independently verifiable task.
- Use hidden `agency-task-id` markers for synchronization.
- Include parent, objective, dependencies, acceptance criteria, verification, owner role, risk, and status.
- Link owner decisions only when a real approval boundary blocks progress.
- Do not close a task until its acceptance criteria and verification are complete.
- Do not mark the epic complete before owner acceptance and the configured release state.

## GitHub Project policy

Prefer built-in auto-add/status workflows configured by the repository owner. Update project fields programmatically only when `allow_project_status_update` is true and a supported project integration is available.

## Pull requests and branches

Issue-management permission does not imply branch, commit, push, or pull-request permission. Check each independent flag before any action. Opening a pull request never authorizes merging.

## Output

Return:

- repository target;
- dry-run or applied mode;
- issues created/updated/skipped;
- missing labels or unsupported project operations;
- updated local plan path;
- any authorization or validation blocker.
