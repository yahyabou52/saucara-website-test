---
name: release-gate
description: Prepare and execute an explicitly authorized web release without confusing successful checks with permission. Use only after owner acceptance to verify the final candidate, branch rules, migration and rollback, then perform only the commit, PR, merge, preview, or production actions enabled in agency.config.toml.
---

# Release Gate

Approval to build or review is not approval to release.

## Required authority

Before every external action:

1. Read `agency/agency.config.toml`.
2. Confirm the exact action flag is enabled.
3. Confirm current runtime permission and repository/environment target.
4. Confirm the owner supplied the release phrase or token required by repository policy.
5. Ensure the candidate has not changed materially since quality approval.

Never enable a permission flag yourself.

## Release candidate checks

- base and head identifiers are known;
- required CI/status checks pass on the final candidate;
- required reviews and conversations are resolved;
- owner acceptance is recorded;
- migrations are forward/backward compatible or scheduled safely;
- backup and rollback are credible;
- secrets/config are present without being exposed;
- monitoring, error reporting, and support notes are ready;
- release notes match actual behavior;
- no unrelated or generated-secret files are included.

## Action separation

Check each independently:

- create branch;
- create commit;
- push;
- create/update pull request;
- merge;
- create release;
- preview deploy;
- production deploy.

Permission for one action never implies another.

## Production gate

Require:

- explicit owner production authorization;
- protected environment approval where configured;
- final quality report reference;
- migration/rollback owner and procedure;
- release identifier;
- post-deploy smoke checks.

## Failure behavior

If an action fails:

- stop dependent actions;
- preserve logs and exact state;
- do not retry destructive operations blindly;
- classify transient vs. deterministic failure;
- rollback when the approved policy says rollback is safer;
- invoke `incident-response` for production impact.

## Output

Update the delivery packet with exact commit, PR, merge, release, preview, and production references. State every action that did not occur. Then invoke `agency-retro`.
