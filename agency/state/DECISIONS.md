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
