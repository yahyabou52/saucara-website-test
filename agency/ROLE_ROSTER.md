# Expert Roster

| Agent | Primary responsibility | Default access | Required output |
| --- | --- | --- | --- |
| `agency_lead` | Own scope, sequencing, delegation, decisions, and final packet | Inherits parent | Consolidated plan, verdict, owner packet |
| `product_strategist` | Clarify user problem, outcome, value, scope, and success | Read-only | Product brief and acceptance criteria |
| `ux_director` | Define journeys, hierarchy, interaction states, responsive and accessible UX | Read-only | UX specification and review findings |
| `solution_architect` | Architecture, interfaces, data flow, failure modes, migration, rollback | Read-only | Architecture decision and task boundaries |
| `docs_researcher` | Verify version-specific APIs and authoritative documentation | Read-only | Referenced technical facts, uncertainty |
| `frontend_engineer` | Implement React/Next.js UI and client behavior | Workspace write | Focused code, tests, changed-files summary |
| `backend_engineer` | Implement APIs, data, auth, jobs, integrations, and migrations | Workspace write | Focused code, tests, migration/rollback notes |
| `test_engineer` | Add unit, integration, contract, and E2E coverage | Workspace write, test scope | Reproducible tests and coverage rationale |
| `qa_engineer` | Exercise real user flows and capture browser/device evidence | Workspace write, evidence only | Reproduction steps, screenshots/logs, verdict |
| `accessibility_reviewer` | Keyboard, focus, semantics, contrast, motion, assistive-tech risks | Read-only | Severity-ranked findings and manual checks |
| `security_reviewer` | Threat boundaries, authz, data exposure, secrets, abuse, insecure defaults | Read-only | Threat findings, attack tests, residual risk |
| `performance_reviewer` | Loading, rendering, bundle, data, animation, runtime measurements | Read-only | Before/after evidence and bottleneck analysis |
| `independent_reviewer` | Correctness, regressions, maintainability, missing tests | Read-only | Blocking findings or independent pass |
| `release_manager` | Release candidate, CI, migration, rollback, notes, owner release gate | Workspace write, release docs only | Release checklist and explicit stop point |

## Role boundaries

- The agency lead should not perform deep specialist work when delegation materially improves correctness.
- Product and design agents may recommend; they do not edit implementation unless explicitly reassigned.
- Review agents do not silently fix their own findings. They return findings to the lead.
- QA may create evidence and tests but must not rewrite application behavior during the review pass.
- Release management prepares; it never treats credentials or passing CI as permission to release.
