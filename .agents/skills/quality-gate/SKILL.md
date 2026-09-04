---
name: quality-gate
description: Run an independent, evidence-based release-candidate review for a web project. Use after implementation or rework to execute lint, types, tests, build, browser QA, accessibility, security, performance, and code review as applicable, then issue a PASS, REWORK, or BLOCKED verdict.
---

# Quality Gate

Review the candidate independently from its builders.

## Inputs

- owner brief and project charter;
- acceptance criteria and task graph;
- base-to-candidate diff;
- builder summaries and targeted test results;
- risk register and architecture decisions;
- running application or reproducible local setup.

Builder summaries are leads, not proof.

## Automated baseline

Run:

```bash
python3 scripts/validate_agency.py
python3 scripts/quality_gate.py --ci
```

If project scripts use different names, update `agency/agency.config.toml` rather than silently skipping them. A missing required capability must be implemented, marked not applicable with reason, or documented as an owner-visible exception.

## Independent review board

Select according to risk:

- `independent_reviewer`: correctness, regressions, maintainability, race/edge cases, missing tests;
- `qa_engineer`: real browser/device journeys, console/network errors, responsive behavior, visual evidence;
- `accessibility_reviewer`: keyboard, focus, semantics, names, contrast, motion, zoom/text sizing, assistive-tech risks;
- `security_reviewer`: trust boundaries, authn/authz, exposure, injection, upload, secrets, SSRF, abuse, insecure defaults;
- `performance_reviewer`: load/runtime measurements, bundle, rendering, images/fonts, data volume, animation, regressions;
- `docs_researcher`: disputed framework/provider behavior.

Run independent read/review passes in parallel only after the candidate is stable. Ask agents to cite exact files, flows, commands, screenshots, or measurements.

## Severity

- **Blocker:** cannot safely evaluate, build, run, migrate, or release.
- **Critical:** likely security/privacy/data-loss or core-journey failure.
- **High:** significant regression or requirement failure.
- **Medium:** real defect with bounded impact.
- **Low:** minor non-blocking issue.
- **Suggestion:** optional improvement outside completion criteria.

Do not inflate style preferences into blockers. Do not downgrade a serious issue because fixing it is inconvenient.

## Verdict

- `PASS`: all required gates pass; no unresolved blocker/critical/high requirement failure.
- `PASS_WITH_EXCEPTIONS`: only explicit, bounded, owner-visible non-blocking exceptions remain.
- `REWORK`: defects can be corrected inside scope.
- `BLOCKED`: owner decision, unavailable dependency, permission, environment, or external failure prevents a defensible result.

## Rework loop

For `REWORK`:

1. deduplicate findings;
2. identify root cause and affected acceptance criteria;
3. assign fixes to the correct builder;
4. rerun targeted checks;
5. rerun every affected independent gate;
6. record why the original process missed the defect.

Do not let the reviewer silently become the builder and approve its own fix.

## Report

Write `agency/state/QUALITY_REPORT.md` with:

- candidate/base identifiers;
- commands and exact results;
- browser/device evidence;
- findings by severity;
- passed, failed, skipped, not-applicable, and unverified gates;
- rework history;
- final verdict and residual risks.
