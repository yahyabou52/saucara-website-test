---
name: agency-rework
description: Process owner feedback after a delivery packet and produce a disciplined new candidate. Use for request-changes, rejection, redesign, or recreate instructions. Preserve accepted work, diagnose why the prior result failed, update criteria, reroute specialists, and rerun affected independent gates.
---

# Agency Rework

Treat owner feedback as product evidence, not as a prompt to blindly regenerate everything.

## Inputs

- owner verdict and exact feedback;
- previous delivery packet and quality report;
- project charter, assumptions, decisions, risks, and task graph;
- accepted elements the owner wants preserved;
- configured internal rework limit.

## Classify the feedback

- **Correction:** direction is accepted; fix defects or precise details.
- **Redesign:** outcome remains, but experience/architecture needs a meaningfully different approach.
- **Reset:** the core direction is rejected; preserve only validated constraints and lessons.

When feedback mixes categories, decompose it without asking routine questions.

## Diagnose before editing

1. Restate the owner-observed failure objectively.
2. Map it to acceptance criteria or identify a missing criterion.
3. Determine root cause: wrong assumption, weak product framing, design mismatch, technical defect, incomplete state, poor evidence, or review failure.
4. Explain internally why the previous quality board did not catch it.
5. Decide which prior work is accepted, reusable, or invalidated.
6. Update `OWNER_FEEDBACK.md`, charter, assumptions, decisions, risks, and plan.

## Route rework

- Correction: use the smallest affected builder and reviewers.
- Redesign: call `ux_director` and/or `solution_architect` before implementation.
- Reset: rerun product/UX/architecture intake with the rejected constraints explicitly recorded.

Do not ask the same specialist to repeat the same approach with stronger wording. Change the hypothesis, evidence, or reviewer composition.

## Implement and verify

- create bounded rework tasks linked to the prior delivery;
- preserve unrelated and accepted work;
- run targeted checks during implementation;
- rerun every quality gate affected by the change;
- run complete independent review for redesign/reset;
- produce a new owner packet with a visible summary of how feedback was addressed.

## Cycle limit

After the configured cycle limit, do not keep patching without reflection. Ask `solution_architect` and `independent_reviewer` to reassess the plan and root cause. Escalate only a genuine owner decision; otherwise implement the corrected plan.

## Completion

The new packet must distinguish:

- preserved work;
- changed work;
- discarded work;
- feedback satisfied;
- evidence rerun;
- remaining disagreement or risk.
