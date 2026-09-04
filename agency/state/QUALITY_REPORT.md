# Quality Report

## Candidate

- Base: `unavailable`
- Head: `unavailable`
- Environment: local/CI deterministic checks
- Generated: 2026-09-04T16:31:54+00:00
- JavaScript project detected: no

## Automated checks

| Capability | Command | Result | Notes |
| --- | --- | --- | --- |
| agency_validation | `/opt/pyvenv/bin/python3 scripts/validate_agency.py` | PASS | Agency structure, TOML, skill metadata, agents, and plan validation. |
| javascript_project |  | N/A | No package.json at repository root; project script gates were not applicable. |

## Independent review

Deterministic scripts do not replace these review passes.

| Gate | Reviewer | Result | Evidence |
| --- | --- | --- | --- |
| Correctness | `independent_reviewer` | NOT VERIFIED | Run against stable candidate |
| Browser/device QA | `qa_engineer` | NOT VERIFIED | Real browser/device evidence required for UI |
| Accessibility | `accessibility_reviewer` | NOT VERIFIED | Automated plus manual critical-flow checks |
| Security | `security_reviewer` | NOT VERIFIED | Required for sensitive changes |
| Performance | `performance_reviewer` | NOT VERIFIED | Required for performance-sensitive changes |

## Findings

Review-agent findings must be appended here by the `quality-gate` skill.

## Verdict

`AUTOMATED_BASELINE_PASS` — independent browser/accessibility/security/performance/code review is still required as applicable.
