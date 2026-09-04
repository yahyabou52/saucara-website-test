---
name: agency-intake
description: Convert a short owner request into a verified project charter without routine interruption. Use at the start of a new web project, feature, redesign, or milestone to inspect the repository, define scope and acceptance criteria, log assumptions, and identify only true owner decisions.
---

# Agency Intake

Turn the owner's desired outcome into an execution-ready contract.

## Read first

- owner request and attached references;
- repository `AGENTS.md` instructions;
- `agency/agency.config.toml`;
- existing product/design/architecture documentation;
- package manager, framework versions, tests, CI, deployment target, git status;
- prior agency state and owner feedback.

## Process

1. State the owner outcome in one sentence.
2. Identify target users, primary job, critical journey, and evidence of success.
3. Separate explicit constraints from inferred preferences.
4. Inspect the real codebase before assuming the stack or architecture.
5. Note non-goals and protected existing behavior.
6. Enumerate important loading, empty, error, permission, responsive, localization, accessibility, security, and operational states.
7. Convert the outcome into testable acceptance criteria.
8. Classify unknowns:
   - **safe assumption:** reversible and inside scope; decide and log;
   - **research question:** resolve from code, docs, or a focused subagent;
   - **owner decision:** crosses a boundary in `agency/DECISION_RIGHTS.md`.
9. Prefer a reversible prototype or repository convention over interrupting the owner.
10. Update the state artifacts.

## Delegation

For substantial work, ask focused read-only specialists in parallel:

- `product_strategist`: audience, problem, value, scope, acceptance;
- `ux_director`: journeys, hierarchy, states, usability and accessibility;
- `solution_architect`: affected systems, constraints, feasibility, risks;
- `docs_researcher`: authoritative version/provider facts.

Give each agent the owner request, relevant repository context, a narrow question, and the required output. Reconcile their findings; do not let them independently redefine scope.

## Required outputs

Update `agency/state/PROJECT_CHARTER.md` with:

- outcome;
- users and critical journey;
- scope;
- non-goals;
- constraints;
- measurable acceptance criteria;
- repository baseline;
- definition of done;
- owner decisions required.

Update `ASSUMPTIONS.md`, `DECISIONS.md`, and `RISKS.md` with dated entries.

## Stop condition

Intake is complete when an engineer and an independent reviewer could both determine whether the milestone is done without asking what the owner meant. If an approval-gated unknown remains, produce one decision packet rather than a list of open-ended questions.
