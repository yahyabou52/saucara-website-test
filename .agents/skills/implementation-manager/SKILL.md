---
name: implementation-manager
description: Execute an agency task graph with controlled code ownership, focused specialist builders, tests, and state updates. Use after intake and planning when Codex should implement a web project or feature while preserving unrelated work and preventing parallel edit conflicts.
---

# Implementation Manager

Turn the approved internal plan into a stable candidate.

## Preconditions

- project charter and acceptance criteria exist;
- `agency/state/plan.json` validates;
- architecture and sensitive trust boundaries are understood;
- approval-gated blockers are resolved or isolated;
- git status and unrelated owner changes are recorded;
- write permissions are sufficient for the intended local work.

## Ownership

Assign one accountable builder per task:

- `frontend_engineer` for client UI, React/Next components, browser state, and styling;
- `backend_engineer` for APIs, data, auth, jobs, integrations, and migrations;
- `test_engineer` for missing independent coverage or test infrastructure.

Use multiple writers only when scopes are disjoint and isolated. Never let agents race on shared contracts, lockfiles, global configuration, migrations, routes, tokens, or generated files.

## Per-task loop

1. Confirm dependencies are complete.
2. Give the builder the exact task, acceptance criteria, allowed paths, affected interfaces, and verification.
3. Inspect the existing execution path before editing.
4. Make the smallest coherent change that satisfies the outcome.
5. Add or update tests for changed behavior.
6. Run targeted lint/type/test/build or browser checks.
7. Review the diff for accidental or unrelated changes.
8. Update task status, decisions, assumptions, and risks.
9. Do not call the task done while any criterion is unverified.

## Frontend requirements

As applicable:

- responsive layouts and touch targets;
- semantic structure, keyboard/focus behavior, contrast, reduced motion;
- loading, empty, error, success, retry, disabled, and permission states;
- real form validation and user feedback;
- no hydration warnings or avoidable client rendering;
- asset optimization and stable layout;
- localization/RTL behavior when the product supports it.

## Backend requirements

As applicable:

- authorization at the server/data boundary;
- input validation and safe error behavior;
- idempotency and retry behavior;
- least-privilege data access;
- reversible migration and compatibility plan;
- concurrency and transaction correctness;
- secrets outside code/logs;
- contract and attack tests;
- observability without leaking sensitive data.

## Completion candidate

Implementation is ready for the quality board only when:

- tasks are complete or explicitly excluded;
- targeted verification passes;
- no known blocker/critical issue is hidden;
- the worktree is stable enough for independent review;
- the diff and plan agree.

Do not merge or deploy from this skill.
