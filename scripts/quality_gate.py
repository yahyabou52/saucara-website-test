#!/usr/bin/env python3
"""Run repository quality scripts and write an evidence report.

This tool handles deterministic repository checks. Browser, accessibility, security,
performance, and independent-review verdicts remain separate agency review passes.
"""

from __future__ import annotations

import argparse
import json
import shutil
import subprocess
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

try:
    import tomllib
except ModuleNotFoundError:  # pragma: no cover
    try:
        import tomli as tomllib  # type: ignore[no-redef]
    except ModuleNotFoundError as exc:  # pragma: no cover
        raise SystemExit("Python 3.11+ or the 'tomli' package is required.") from exc

ROOT = Path(__file__).resolve().parents[1]


@dataclass
class Result:
    capability: str
    command: list[str] | None
    status: str
    returncode: int | None
    notes: str


def load_toml(path: Path) -> dict[str, Any]:
    with path.open("rb") as handle:
        return tomllib.load(handle)


def run_command(command: list[str], cwd: Path) -> tuple[int, str]:
    print("\n$ " + " ".join(command), flush=True)
    process = subprocess.run(
        command,
        cwd=cwd,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=False,
    )
    output = process.stdout or ""
    if output:
        print(output, end="" if output.endswith("\n") else "\n")
    return process.returncode, output


def detect_runner(root: Path) -> tuple[str, list[str]]:
    if (root / "pnpm-lock.yaml").exists():
        return "pnpm", ["pnpm", "run"]
    if (root / "yarn.lock").exists():
        return "yarn", ["yarn", "run"]
    if (root / "bun.lock").exists() or (root / "bun.lockb").exists():
        return "bun", ["bun", "run"]
    return "npm", ["npm", "run"]


def git_value(args: list[str]) -> str:
    try:
        result = subprocess.run(
            ["git", *args],
            cwd=ROOT,
            text=True,
            stdout=subprocess.PIPE,
            stderr=subprocess.DEVNULL,
            check=False,
        )
    except FileNotFoundError:
        return "unavailable"
    return result.stdout.strip() if result.returncode == 0 and result.stdout.strip() else "unavailable"


def format_command(command: list[str] | None) -> str:
    if not command:
        return ""
    return "`" + " ".join(command).replace("|", "\\|") + "`"


def write_report(path: Path, results: list[Result], package_present: bool) -> None:
    generated = datetime.now(timezone.utc).isoformat(timespec="seconds")
    base = git_value(["merge-base", "HEAD", "main"])
    head = git_value(["rev-parse", "HEAD"])

    lines = [
        "# Quality Report",
        "",
        "## Candidate",
        "",
        f"- Base: `{base}`",
        f"- Head: `{head}`",
        f"- Environment: local/CI deterministic checks",
        f"- Generated: {generated}",
        f"- JavaScript project detected: {'yes' if package_present else 'no'}",
        "",
        "## Automated checks",
        "",
        "| Capability | Command | Result | Notes |",
        "| --- | --- | --- | --- |",
    ]
    for result in results:
        notes = result.notes.replace("|", "\\|").replace("\n", " ")
        lines.append(
            f"| {result.capability} | {format_command(result.command)} | {result.status} | {notes} |"
        )

    lines.extend(
        [
            "",
            "## Independent review",
            "",
            "Deterministic scripts do not replace these review passes.",
            "",
            "| Gate | Reviewer | Result | Evidence |",
            "| --- | --- | --- | --- |",
            "| Correctness | `independent_reviewer` | NOT VERIFIED | Run against stable candidate |",
            "| Browser/device QA | `qa_engineer` | NOT VERIFIED | Real browser/device evidence required for UI |",
            "| Accessibility | `accessibility_reviewer` | NOT VERIFIED | Automated plus manual critical-flow checks |",
            "| Security | `security_reviewer` | NOT VERIFIED | Required for sensitive changes |",
            "| Performance | `performance_reviewer` | NOT VERIFIED | Required for performance-sensitive changes |",
            "",
            "## Findings",
            "",
            "Review-agent findings must be appended here by the `quality-gate` skill.",
            "",
            "## Verdict",
            "",
        ]
    )

    failing = [r for r in results if r.status == "FAIL"]
    missing = [r for r in results if r.status == "MISSING"]
    if failing or missing:
        lines.append("`REWORK` — deterministic quality checks are incomplete or failing.")
    else:
        lines.append(
            "`AUTOMATED_BASELINE_PASS` — independent browser/accessibility/security/performance/code review is still required as applicable."
        )

    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text("\n".join(lines) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--ci", action="store_true", help="CI mode; retained for stable invocation semantics.")
    parser.add_argument(
        "--report",
        type=Path,
        default=ROOT / "agency" / "state" / "QUALITY_REPORT.md",
        help="Markdown report output path.",
    )
    parser.add_argument(
        "--only",
        action="append",
        default=[],
        help="Run only a named capability; may be repeated.",
    )
    parser.add_argument(
        "--allow-missing",
        action="store_true",
        help="Do not fail when an expected package script is missing. Missing checks remain visible.",
    )
    args = parser.parse_args()

    config_path = ROOT / "agency" / "agency.config.toml"
    if not config_path.exists():
        print("Missing agency/agency.config.toml", file=sys.stderr)
        return 2
    config = load_toml(config_path)
    aliases: dict[str, list[str]] = config.get("quality", {}).get("script_aliases", {})

    results: list[Result] = []

    validator = ROOT / "scripts" / "validate_agency.py"
    code, _ = run_command([sys.executable, str(validator)], ROOT)
    results.append(
        Result(
            capability="agency_validation",
            command=[sys.executable, "scripts/validate_agency.py"],
            status="PASS" if code == 0 else "FAIL",
            returncode=code,
            notes="Agency structure, TOML, skill metadata, agents, and plan validation.",
        )
    )

    package_path = ROOT / "package.json"
    package_present = package_path.exists()
    if not package_present:
        results.append(
            Result(
                capability="javascript_project",
                command=None,
                status="N/A",
                returncode=None,
                notes="No package.json at repository root; project script gates were not applicable.",
            )
        )
        write_report(args.report, results, package_present=False)
        return 1 if any(r.status == "FAIL" for r in results) else 0

    try:
        package = json.loads(package_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        print(f"Invalid package.json: {exc}", file=sys.stderr)
        results.append(Result("package_json", None, "FAIL", 2, str(exc)))
        write_report(args.report, results, package_present=True)
        return 2

    scripts = package.get("scripts", {})
    if not isinstance(scripts, dict):
        scripts = {}
    manager, runner = detect_runner(ROOT)
    if shutil.which(runner[0]) is None:
        note = f"{manager} was selected from lockfiles but executable {runner[0]!r} is unavailable."
        print(note, file=sys.stderr)
        results.append(Result("package_manager", runner, "FAIL", 127, note))
        write_report(args.report, results, package_present=True)
        return 127

    requested = set(args.only)
    capabilities = ["lint", "typecheck", "test", "build"]
    if requested:
        unknown = requested - set(capabilities)
        if unknown:
            print(f"Unknown capabilities: {', '.join(sorted(unknown))}", file=sys.stderr)
            return 2
        capabilities = [cap for cap in capabilities if cap in requested]

    for capability in capabilities:
        candidates = aliases.get(capability, [capability])
        if not isinstance(candidates, list) or any(not isinstance(item, str) for item in candidates):
            results.append(
                Result(capability, None, "FAIL", 2, "Invalid script alias configuration.")
            )
            continue

        selected = next((candidate for candidate in candidates if candidate in scripts), None)
        if selected is None:
            results.append(
                Result(
                    capability=capability,
                    command=None,
                    status="MISSING",
                    returncode=None,
                    notes=f"No package script found. Checked: {', '.join(candidates)}.",
                )
            )
            continue

        command = [*runner, selected]
        code, _ = run_command(command, ROOT)
        results.append(
            Result(
                capability=capability,
                command=command,
                status="PASS" if code == 0 else "FAIL",
                returncode=code,
                notes=f"Resolved to package script {selected!r} using {manager}.",
            )
        )

    write_report(args.report, results, package_present=True)

    failures = [result for result in results if result.status == "FAIL"]
    missing = [result for result in results if result.status == "MISSING"]
    print("\nQuality summary:")
    for result in results:
        print(f"  {result.capability:20} {result.status}")
    print(f"\nReport: {args.report}")

    if failures:
        return 1
    if missing and not args.allow_missing:
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
