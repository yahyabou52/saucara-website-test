# External Specialist Skills Registry

The agency skills in `.agents/skills/` are the management layer. Add external expert skills only when the repository needs them. Inspect every `SKILL.md`, script, permission, network call, credential requirement, and installation step before enabling it. Record the source commit or release for repeatability.

## Core web stack

| Capability | Suggested skill/source | Use when |
| --- | --- | --- |
| React performance and architecture | `react-best-practices` — Vercel Agent Skills | React/Next rendering, waterfalls, bundle, state, server/client boundaries |
| Component API design | `composition-patterns` — Vercel Agent Skills | Reusable components, variants, compound APIs, avoiding boolean-prop sprawl |
| Web UI review | `web-design-guidelines` — Vercel Agent Skills | Responsive UI, forms, focus, motion, usability, accessibility |
| Next.js | `next-best-practices` and version-specific local docs | App Router, caching, metadata, routing, server/client patterns |
| Browser automation | `playwright` — OpenAI plugin skills | User journeys, forms, responsive behavior, screenshots, E2E |
| Web quality | `web-quality-audit`, `performance`, `core-web-vitals`, `accessibility`, `seo` — Addy Osmani | Pre-owner audit and measured quality gates |
| GitHub CI | `gh-fix-ci` — OpenAI plugin skills | Failing GitHub Actions checks |
| Review feedback | `gh-address-comments` — OpenAI plugin skills | Bounded PR review corrections |
| Documentation | `writing-guidelines` or equivalent | README, ADR, migration, operation, release notes |

## Product, design, and agency workflow

Selective gstack roles can complement this OS:

- `office-hours` for product discovery;
- `plan-ceo-review` for scope/value challenge;
- `plan-design-review` for experience critique;
- `plan-eng-review` for architecture and test planning;
- `design-review` for implemented UI comparison;
- `investigate` for root-cause debugging;
- `review` for staff-level code review;
- `qa-only` for independent browser QA;
- `cso` for sensitive security review;
- `retro` for milestone learning.

Do not install a second end-to-end workflow framework and let it compete with `agency-orchestrator`. Route individual specialist roles under the agency lead.

## Security and backend

Install only the provider actually used:

- OpenAI `security-best-practices` and `security-threat-model`;
- Supabase/Postgres best practices for Supabase;
- Neon-specific guidance for Neon;
- Stripe best practices for payments;
- provider-specific authentication guidance;
- Trail of Bits differential review, sharp-edges, and insecure-default analysis for high-risk work.

Require migration reversibility, least privilege, tenant isolation, provider-native behavior, attack tests, secret handling, and rollback.

## Motion and premium experience

For cinematic sites, use the official GSAP skills selectively:

- `gsap-core`
- `gsap-timeline`
- `gsap-scrolltrigger`
- `gsap-react`
- `gsap-performance`
- `gsap-plugins` only when needed

Always pair motion with reduced-motion behavior, resize/orientation stability, mobile fallback, keyboard usability, and measured performance.

## Growth and launch

After product truth exists:

- product marketing and positioning;
- copywriting and copy editing;
- CRO and onboarding;
- technical SEO, schema, and site architecture;
- launch planning and social content;
- pricing and sales enablement.

Growth agents may not invent features, customers, metrics, guarantees, testimonials, or research.

## Installation policy

1. Detect what is already installed.
2. Identify the smallest missing set.
3. Prefer official/original publishers.
4. Inspect source and permissions before installation.
5. Pin or record a version/commit.
6. Install one category at a time.
7. restart Codex if discovery does not refresh.
8. Run a read-only smoke test.
9. Avoid duplicate skill names and overlapping orchestrators.
