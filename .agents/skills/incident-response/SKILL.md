---
name: incident-response
description: Coordinate a bounded web-production incident response. Use when a release causes outage, data risk, security exposure, or severe regression. Stabilize first, gather evidence, choose rollback or fix-forward, preserve auditability, verify recovery, and produce an owner incident packet.
---

# Incident Response

Prioritize user safety, data integrity, and service recovery over feature completion.

## Immediate sequence

1. Establish severity, affected users/systems, start time, and current symptoms.
2. Stop further rollout or automation that could worsen impact.
3. Preserve logs, release identifiers, alerts, and relevant evidence without exposing secrets or personal data.
4. Identify the last known good state and available rollback.
5. Decide rollback vs. fix-forward using reversibility, data compatibility, and time-to-safe-state.
6. Obtain required owner/production authorization unless the repository has a pre-approved emergency rollback policy.
7. Apply the smallest stabilization action.
8. Run focused smoke checks and monitor recovery.

## Delegation

- `qa_engineer`: reproduce and confirm user impact;
- `solution_architect`: map failure path and rollback/fix-forward consequences;
- `security_reviewer`: join immediately for potential exposure or auth failure;
- `backend_engineer` or `frontend_engineer`: implement bounded stabilization;
- `independent_reviewer`: challenge the proposed fix and regression coverage;
- `release_manager`: execute authorized rollback/release mechanics.

Keep write ownership narrow during the incident.

## Do not

- destroy logs or evidence;
- conceal impact in a normal release summary;
- retry migrations or writes without idempotency/recovery analysis;
- expose sensitive incident data in public issues;
- perform a broad refactor while stabilizing;
- declare recovery before user-facing and system checks confirm it.

## Required records

Create or update an incident record with:

- timeline;
- impact and severity;
- detection source;
- release/change correlation;
- stabilization actions and authority;
- verification and monitoring;
- residual risk;
- follow-up tasks;
- preliminary and final root cause.

After recovery, invoke `agency-retro` and add regression tests, monitoring, rollback improvements, and process corrections.
