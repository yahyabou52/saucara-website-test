---
name: owner-handoff
description: Turn the completed agency work into one concise owner acceptance packet. Use after the internal quality board or when a gated blocker must be escalated. Include preview, scope, evidence, decisions, risks, repository activity, rollback, and a clear approve/change/rethink action.
---

# Owner Handoff

The owner should review the product result, not manage the internal team.

## Preconditions

- quality board verdict exists, or a real approval-gated blocker exists;
- acceptance criteria and scope are current;
- completion claims have evidence;
- repository and external actions are known exactly;
- residual risks and exceptions are explicit.

## Prepare the packet

Use `agency/OWNER_REVIEW_TEMPLATE.md` and write `agency/state/DELIVERY_PACKET.md`.

Lead with one of:

- `READY_FOR_OWNER_REVIEW`;
- `BLOCKED`;
- `NOT_READY`.

Then provide:

1. owner-visible outcome;
2. preview URL or exact local run steps;
3. completed scope and intentional exclusions;
4. compact evidence table;
5. important decisions and assumptions;
6. remaining limitations and risks;
7. rollback approach;
8. exact repository/external activity;
9. one owner verdict choice.

## Evidence language

Use only:

- `PASS` for a check that ran and passed;
- `FAIL` for a check that ran and failed;
- `SKIP` for an intentionally skipped check with reason;
- `N/A` for a genuinely irrelevant check;
- `NOT VERIFIED` when evidence is unavailable.

Do not convert a skipped or unverified item into a positive statement.

## Owner verdicts

- **APPROVE:** accept the candidate; release remains a separate configured action.
- **REQUEST CHANGES:** preserve direction and correct bounded feedback.
- **REJECT AND RETHINK:** retain validated constraints and lessons, discard the rejected direction, create a materially different solution.

## Blocked packet

When blocked, provide one recommended decision, at most two alternatives, impact, safe work already completed, and the exact approval/configuration needed. Do not present an internal error log as an owner decision.

## Communication quality

Keep the main packet concise and actionable. Link or reference detailed plans, reports, screenshots, logs, and diffs rather than pasting noisy intermediate output. Never hide a blocker below a celebratory summary.
