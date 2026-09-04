#!/usr/bin/env python3
"""Safely install Codex Web Agency OS into another repository.

Dry-run is the default. Existing AGENTS.md instructions are preserved. Other
conflicts become *.agency-os.new unless --replace-conflicts is explicitly used.
"""

from __future__ import annotations

import argparse
import filecmp
import shutil
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
AGENTS_BEGIN = "<!-- CODEX_WEB_AGENCY_OS_BEGIN -->"
AGENTS_END = "<!-- CODEX_WEB_AGENCY_OS_END -->"

CORE_PATHS = (
    Path(".agents/skills"),
    Path(".codex/agents"),
    Path(".codex/config.toml"),
    Path("agency"),
    Path("scripts/README.md"),
    Path("scripts/install_into_repo.py"),
    Path("scripts/quality_gate.py"),
    Path("scripts/sync_github_tasks.py"),
    Path("scripts/validate_agency.py"),
)

GITHUB_PATHS = (
    Path(".github/ISSUE_TEMPLATE"),
    Path(".github/PULL_REQUEST_TEMPLATE.md"),
    Path(".github/CODEOWNERS"),
    Path(".github/dependabot.yml"),
    Path(".github/workflows/agency-quality-gate.yml"),
)


@dataclass(frozen=True)
class Operation:
    action: str
    source: Path | None
    destination: Path
    note: str = ""


def relative_files(path: Path) -> list[Path]:
    if path.is_file():
        return [path.relative_to(ROOT)]
    return [item.relative_to(ROOT) for item in sorted(path.rglob("*")) if item.is_file()]


def same_file(source: Path, destination: Path) -> bool:
    return destination.is_file() and filecmp.cmp(source, destination, shallow=False)


def sidecar_path(destination: Path) -> Path:
    return destination.with_name(destination.name + ".agency-os.new")


def extract_agency_block(text: str) -> str:
    start = text.find(AGENTS_BEGIN)
    end = text.find(AGENTS_END)
    if start == -1 or end == -1 or end < start:
        raise ValueError("source AGENTS.md is missing valid agency markers")
    return text[start : end + len(AGENTS_END)]


def merge_agents(existing: str, block: str) -> str:
    start = existing.find(AGENTS_BEGIN)
    end = existing.find(AGENTS_END)
    if start == -1 and end == -1:
        prefix = existing.rstrip()
        return (prefix + "\n\n" if prefix else "") + block + "\n"
    if start == -1 or end == -1 or end < start:
        raise ValueError("target AGENTS.md contains only one agency marker; repair it manually")
    end += len(AGENTS_END)
    return existing[:start] + block + existing[end:]


def plan_install(target: Path, include_github: bool, replace_conflicts: bool) -> list[Operation]:
    operations: list[Operation] = []

    source_agents = ROOT / "AGENTS.md"
    destination_agents = target / "AGENTS.md"
    block = extract_agency_block(source_agents.read_text(encoding="utf-8"))
    if destination_agents.exists():
        existing = destination_agents.read_text(encoding="utf-8")
        if merge_agents(existing, block) != existing:
            operations.append(Operation("merge-agents", source_agents, destination_agents))
    else:
        operations.append(Operation("copy", source_agents, destination_agents))

    requested = list(CORE_PATHS)
    if include_github:
        requested.extend(GITHUB_PATHS)

    files: list[Path] = []
    for relative in requested:
        source = ROOT / relative
        if not source.exists():
            raise FileNotFoundError(f"package path is missing: {relative}")
        files.extend(relative_files(source))

    seen: set[Path] = set()
    for relative in files:
        if relative in seen:
            continue
        seen.add(relative)
        source = ROOT / relative
        destination = target / relative
        if not destination.exists():
            operations.append(Operation("copy", source, destination))
        elif same_file(source, destination):
            continue
        elif replace_conflicts:
            operations.append(Operation("replace", source, destination, "backup existing file"))
        else:
            incoming = sidecar_path(destination)
            if incoming.exists() and same_file(source, incoming):
                continue
            operations.append(Operation("sidecar", source, incoming, f"conflict at {relative}"))

    return operations


def backup_file(target: Path, destination: Path, backup_root: Path) -> None:
    relative = destination.relative_to(target)
    backup = backup_root / relative
    backup.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(destination, backup)


def apply_operations(target: Path, operations: list[Operation]) -> Path | None:
    timestamp = datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ")
    backup_root = target / ".agency-os-backups" / timestamp
    made_backup = False
    block = extract_agency_block((ROOT / "AGENTS.md").read_text(encoding="utf-8"))

    for operation in operations:
        destination = operation.destination
        destination.parent.mkdir(parents=True, exist_ok=True)

        if operation.action == "merge-agents":
            backup_file(target, destination, backup_root)
            made_backup = True
            existing = destination.read_text(encoding="utf-8")
            destination.write_text(merge_agents(existing, block), encoding="utf-8")
        elif operation.action == "replace":
            backup_file(target, destination, backup_root)
            made_backup = True
            assert operation.source is not None
            shutil.copy2(operation.source, destination)
        elif operation.action in {"copy", "sidecar"}:
            assert operation.source is not None
            shutil.copy2(operation.source, destination)
        else:  # pragma: no cover
            raise RuntimeError(f"unknown operation: {operation.action}")

    return backup_root if made_backup else None


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("target", type=Path, help="Existing repository root to receive the Agency OS.")
    parser.add_argument("--apply", action="store_true", help="Write the planned installation.")
    parser.add_argument(
        "--include-github",
        action="store_true",
        help="Include Issue Forms, PR template, CODEOWNERS, Dependabot, and CI.",
    )
    parser.add_argument(
        "--replace-conflicts",
        action="store_true",
        help="Back up and replace differing files instead of writing *.agency-os.new sidecars.",
    )
    args = parser.parse_args()

    target = args.target.expanduser().resolve()
    source = ROOT.resolve()
    if target == source:
        print("ERROR: source and target repositories are the same", file=sys.stderr)
        return 2
    if source in target.parents:
        print("ERROR: target cannot be inside the Agency OS source repository", file=sys.stderr)
        return 2
    if not target.exists() or not target.is_dir():
        print(f"ERROR: target directory does not exist: {target}", file=sys.stderr)
        return 2

    try:
        operations = plan_install(target, args.include_github, args.replace_conflicts)
    except (OSError, ValueError) as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    mode = "APPLY" if args.apply else "DRY-RUN"
    print(f"Codex Web Agency OS installer — {mode}")
    print(f"  source: {source}")
    print(f"  target: {target}")
    print(f"  GitHub files: {'included' if args.include_github else 'not included'}")

    if not operations:
        print("\nNo changes required. The target already matches the requested package.")
        return 0

    print(f"\nPlanned operations: {len(operations)}")
    for operation in operations:
        relative = operation.destination.relative_to(target)
        suffix = f" — {operation.note}" if operation.note else ""
        print(f"  {operation.action:12} {relative}{suffix}")

    if not args.apply:
        print("\nDry-run only. No files were changed. Rerun with --apply to install.")
        return 0

    backup_root = apply_operations(target, operations)
    print(f"\nApplied {len(operations)} operation(s).")
    if backup_root:
        print(f"Backups: {backup_root}")
    print("Next: inspect *.agency-os.new files, then run python3 scripts/validate_agency.py")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
