# Decisions

Record material product, design, architecture, routing, and operational decisions.

### ADR-001 — Install Agency OS additively in the target repository

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** The target repository contained only its original `README.md`. The official installer dry-run listed 69 additive copies and no replacements, merges, conflict sidecars, or backups.
- **Decision:** Install the Agency OS with GitHub templates and workflows on the dedicated `codex/saucara-website` branch, preserving the existing README and keeping all GitHub issue operations in dry-run mode.
- **Alternatives:** Use the framework repository as the application worktree; manually copy selected framework files.
- **Consequences:** The target now owns its agency configuration, state, agents, skills, scripts, and GitHub templates. The source framework remains unchanged.
- **Reversibility:** High; the setup is isolated in its own commit and can be reverted without touching the initial target commit.
- **Evidence:** Official installer dry-run and apply each reported 69 `copy` operations; the post-install dry-run reported `No changes required`; no `*.agency-os.new` or backup files were created.
- **Owner approval required:** no; explicitly requested in the owner brief.

### ADR-002 — Validate the installed-project profile

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** The installed `scripts/validate_agency.py` required distribution-only files (`MANIFEST.json`, packaging docs, publisher, and framework tests) that the official installer does not copy, even though the installer directs users to run that validator.
- **Decision:** Patch only the target repository's validator to auto-detect a full framework package versus an installed project. The installed-project profile validates every file promised by the installer, all skill and agent metadata, configuration, and the work plan.
- **Alternatives:** Copy unrelated framework distribution files into the website; accept a permanently failing official validation command.
- **Consequences:** Project validation is meaningful and green without turning the website into a copy of the framework distribution. A future Agency OS update may require reconciling this local integration patch.
- **Reversibility:** High; the change is confined to one installed script.
- **Evidence:** Initial validation detected all 13 skills and 17 agents but failed exclusively on 12 non-installed distribution files.
- **Owner approval required:** no; this is a safe, local compatibility correction.

### ADR-003 — Use a static-first Next.js App Router architecture

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** The target had no application stack. The owner prefers Next.js, TypeScript, Tailwind, and accessible reusable components, while explicitly excluding backend systems.
- **Decision:** Use Next.js App Router with server-rendered static sections, Tailwind/CSS tokens, and only two client islands for the mobile menu and enquiry form. Add no API routes, Server Actions, storage, analytics, animation library, component library, or runtime data fetching.
- **Alternatives:** A fully client-rendered React page; static HTML without routing/tooling; a larger UI/form framework.
- **Consequences:** Minimal shipped JavaScript, build-time validation for local assets, a natural custom 404/metadata model, and narrow interactive test surfaces.
- **Reversibility:** High; there is no persistent data or provider adapter.
- **Evidence:** Owner preference, solution-architect review, Next.js package metadata (`16.3.4`, Node `>=20.9`) and official App Router installation guidance verified 2026-09-04.
- **Owner approval required:** no.

### ADR-004 — Treat contact as a WhatsApp message composer

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** The business goal is WhatsApp enquiry, but no destination number exists and the test must not store personal data or imply that a request is confirmed.
- **Decision:** Validate inputs locally, prepare a French message, and reveal a normal outbound WhatsApp anchor. Use the numberless `wa.me` composer when no approved recipient is configured. Never auto-send, persist, POST, or say the order/message is confirmed.
- **Alternatives:** Invent a number; create a backend lead form; leave CTAs inert.
- **Consequences:** The complete UX is testable and truthful, but a production account is still required before launch.
- **Reversibility:** High; an approved number can be added to centralized configuration.
- **Evidence:** Product/conversion and architecture specialist reviews.
- **Owner approval required:** no for demo; yes before adding production contact credentials.

### ADR-005 — Adopt the Casablanca editorial visual system

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** Automated design searches suggested Liquid Glass and generic Swiss/pink systems that conflict with the supplied green/cream/gold brand and anti-template constraints.
- **Decision:** Use the documented “pâtisserie éditoriale casablancaise” system: Newsreader + Manrope, deep green/cream, contrast-safe gold roles, figure-and-caption layouts, and a limited clipped-corner `Cadre Casablanca` image treatment. Use CSS-only restrained motion.
- **Alternatives:** Keep the generated glass system; use a conventional luxury card grid with Cormorant/Montserrat.
- **Consequences:** The result is brand-specific and lighter, while demanding careful typography, cropping, and contrast review.
- **Reversibility:** High; tokens and image treatment are centralized.
- **Evidence:** Owner brief, UX/visual specialist review, UI/UX database queries, and contrast calculations in the design master.
- **Owner approval required:** no.

### ADR-006 — Route separate strategy, build, and review responsibilities

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** The owner requires the named agency responsibilities and prohibits builders from approving their own work.
- **Decision:** Run read-only product/conversion, UX/visual, and architecture/test specialists in parallel; use one overlapping application writer; then assign a separate stable-candidate review wave covering QA/test, accessibility, performance, and independent implementation review.
- **Alternatives:** One agent performs and approves every phase; multiple overlapping writers race on shared files.
- **Consequences:** Planning is parallelized while implementation remains coherent; review verdicts are independent of the builder.
- **Reversibility:** High.
- **Evidence:** Agency routing matrix and completed specialist findings.
- **Owner approval required:** no; explicitly requested.

### ADR-007 — Use deterministic production build paths in the sandbox

- **Date:** 2026-09-04
- **Status:** accepted
- **Context:** Turbopack tries to bind an internal port while processing PostCSS, an operation denied by this execution container. Next's experimental TypeScript CLI path also exits successfully but loses its captured `--showConfig` output in the same environment.
- **Decision:** Run `next build --webpack` and explicitly disable `experimental.useTypeScriptCli` for reproducible builds in this repository.
- **Alternatives:** Disable type checking; accept a permanently failing build; patch framework internals.
- **Consequences:** The project keeps Next.js App Router, Tailwind, and full type checking (`tsc --noEmit` plus the compiler API check inside the build) without weakening a quality rule. Development may still use Next's default engine.
- **Reversibility:** High; remove the two settings when the execution environment supports the default paths reliably.
- **Evidence:** Two Turbopack runs failed on internal port binding; the CLI runner returned code 0 with empty stdout; the Webpack/compiler-API build completed all six static routes.
- **Owner approval required:** no.

## Template

### ADR-000 — Decision title

- **Date:** YYYY-MM-DD
- **Status:** proposed / accepted / superseded / rejected
- **Context:**
- **Decision:**
- **Alternatives:**
- **Consequences:**
- **Reversibility:**
- **Evidence:**
- **Owner approval required:** no / yes, reference
