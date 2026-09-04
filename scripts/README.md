# Agency Scripts

All scripts are dependency-free on Python 3.11 or newer. Mutating scripts are dry-run by default.

## Install into another repository

```bash
python3 scripts/install_into_repo.py /path/to/project --include-github
python3 scripts/install_into_repo.py /path/to/project --include-github --apply
```

Existing `AGENTS.md` instructions are preserved. Other conflicts become `*.agency-os.new` unless explicit backup-and-replace behavior is requested.

## Validate the package and current plan

```bash
python3 scripts/validate_agency.py
```

Checks skill frontmatter, unique names, custom-agent TOML, agency configuration, manifest consistency, required repository files, task IDs, dependencies, acceptance criteria, and state structure.

## Run deterministic project gates

```bash
python3 scripts/quality_gate.py --ci --report agency/state/QUALITY_REPORT.md
```

Detects npm, pnpm, Yarn, or Bun from lockfiles and runs the first matching script alias for `lint`, `typecheck`, `test`, and `build`. Missing expected scripts fail by default. Browser, accessibility, security, performance, and independent review remain separate expert passes.

## Preview GitHub issue operations

```bash
python3 scripts/sync_github_tasks.py
```

Dry-run only unless explicit configuration permissions and `--apply` are both present.

## Apply authorized GitHub issue operations

```bash
python3 scripts/sync_github_tasks.py --apply
```

Requires GitHub CLI authentication, `github.mode = "manage-issues"`, and matching permission flags. It never commits, pushes, opens a pull request, merges, releases, or deploys.

## Publish this package to GitHub

```bash
python3 scripts/publish_to_github.py --repo OWNER/codex-web-agency-os
python3 scripts/publish_to_github.py --repo OWNER/codex-web-agency-os --visibility private --apply
```

The first command prints the plan. The second initializes Git when required, creates or reuses the repository, pushes `main`, and applies the documented metadata.
