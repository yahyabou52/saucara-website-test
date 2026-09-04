# Owner Operating Phrases

These are agency-contract phrases, not built-in Codex slash commands.

## Accept the build direction

```text
APPROVE CANDIDATE
```

Meaning: the candidate satisfies the owner review. It does **not** authorize merge or production deployment.

## Request bounded changes

```text
REQUEST CHANGES: <exact feedback>
```

Meaning: preserve accepted direction and work; diagnose and correct the feedback; rerun affected gates.

## Reject and recreate the direction

```text
REJECT AND RETHINK: <why it fails>
```

Meaning: preserve validated constraints and accepted elements, discard the rejected solution direction, and produce a materially different candidate with a complete new review.

## Approve a gated decision

```text
APPROVE DECISION <reference>: <selected option>
```

Meaning: authorize only the named decision, not unrelated external actions.

## Authorize release

```text
APPROVE RELEASE: <exact commit, pull request, or release candidate>
```

Meaning: authorize only release actions already enabled in `agency/agency.config.toml` for that exact candidate. A changed candidate requires fresh approval.

## Stop or cancel

```text
STOP AGENCY RUN: <reason>
```

Meaning: stop new work, preserve current state/evidence, and report any partial external actions. Do not roll back or delete work unless separately authorized.
