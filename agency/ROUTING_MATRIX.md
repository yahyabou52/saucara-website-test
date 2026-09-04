# Specialist and Skill Routing Matrix

Use the smallest set that can produce an accountable result. The agency lead may add a specialist when repository evidence justifies it.

| Work type | Planning specialists | Builder | Independent gates | Optional external skills |
| --- | --- | --- | --- | --- |
| New landing page / portfolio | Product strategist, UX director, architect | Frontend engineer | QA, accessibility, performance, independent review | product marketing, copywriting, CRO, SEO, React/Next, web design |
| Existing UI redesign | UX director, repository explorer | Frontend engineer | QA, accessibility, performance, independent review | design review, composition, React best practices |
| Complex full-stack feature | Product strategist, architect, security reviewer | Frontend + backend, serialized at interfaces | Test, QA, security, independent review | provider-specific DB/auth/payment, Playwright |
| Bug / regression | QA reproducer, architect only if cross-system | Appropriate engineer | Regression test, QA, independent review | investigate, browser QA |
| React/Next performance | Architect, performance reviewer | Frontend engineer | Measured performance, regression review | React best practices, Core Web Vitals |
| Authentication / authorization | Architect, security reviewer | Backend engineer | Attack tests, tenant/role isolation, independent security review | threat model, provider-specific auth/database |
| Database migration | Architect, backend engineer | Backend engineer | Reversibility, integrity, concurrency, security | Postgres/provider skill |
| Third-party integration | Docs researcher, architect, security reviewer | Backend or frontend | Contract tests, failure/retry behavior, security | authoritative docs, provider skill |
| Cinematic motion / GSAP | UX director, performance reviewer | Frontend engineer | Reduced motion, responsive QA, performance | GSAP core, timeline, ScrollTrigger, React, performance |
| SEO/content launch | Product strategist, UX director | Frontend/content owner | Accessibility, truth review, SEO audit | product marketing, copy, schema, SEO, launch |
| CI failure | Repository explorer, independent reviewer | Test/appropriate engineer | CI rerun and regression proof | GitHub fix CI |
| PR review corrections | Independent reviewer, affected specialist | Appropriate engineer | Acceptance criteria and complete CI | address review comments |
| Release | Release manager | No new feature work | Full required gate set | ship/release skill only after approval |

## Parallel delegation policy

Good parallel work:

- product/UX/architecture reconnaissance;
- independent documentation verification;
- security, accessibility, and performance review of a stable candidate;
- test-log and CI-failure analysis;
- review of disjoint packages in a monorepo.

Serialize or isolate:

- two agents editing the same module;
- schema plus application changes that depend on the same interface;
- shared design tokens or global CSS;
- generated files, lockfiles, migrations, and central routing/configuration;
- release branch, version, and deployment changes.
