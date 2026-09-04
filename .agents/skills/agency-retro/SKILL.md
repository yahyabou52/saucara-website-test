---
name: agency-retro
description: Convert an accepted, rejected, blocked, released, or incident milestone into durable repository-specific learning. Use after a meaningful agency cycle to record what worked, what escaped internal review, which assumptions failed, and how to improve routing and gates without weakening safeguards.
---

# Agency Retrospective

Improve the operating system from evidence, not self-congratulation.

## Inputs

- owner brief and final verdict;
- plan, decisions, assumptions, risks;
- quality reports and rework history;
- owner feedback;
- CI, review, release, and incident evidence;
- token/cycle metrics when available.

## Review

1. Did the final result satisfy each acceptance criterion?
2. Which defects were caught internally, and by which gate?
3. Which defects or direction problems reached the owner?
4. Which assumptions were correct, wrong, or never verified?
5. Did any specialist duplicate work or produce noise?
6. Were parallel agents helpful, expensive, or conflicting?
7. Did implementation drift beyond scope?
8. Were any checks flaky, skipped, or falsely trusted?
9. Was rework a correction, redesign, or reset, and why?
10. Did permissions and approval gates behave as intended?
11. What repository-specific rule would prevent recurrence?

## Outputs

Append a dated section to `agency/state/RETROSPECTIVE.md`:

- outcome and owner verdict;
- strengths supported by evidence;
- failures/root causes;
- escaped defects;
- routing/concurrency lessons;
- process changes;
- candidate repository rule or test;
- metrics from `agency/EVALUATION_SCORECARD.md`.

Update `OWNER_FEEDBACK.md`, `ASSUMPTIONS.md`, `DECISIONS.md`, and `RISKS.md` when the lesson changes future behavior.

## Learning policy

- Prefer executable tests, lint rules, templates, or acceptance checks over vague reminders.
- Do not weaken a gate because it was inconvenient once.
- Do not overfit one owner's aesthetic preference into every project.
- Do not preserve sensitive prompts, secrets, production data, or unnecessary raw logs.
- Mark a lesson as provisional until repeated evidence supports a broad rule.

## Completion

Return a short list of concrete changes the next agency cycle will use. Retrospective is not permission to modify external systems or release new work.
