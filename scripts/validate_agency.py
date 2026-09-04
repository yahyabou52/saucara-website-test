#!/usr/bin/env python3
"""Validate the Codex Web Agency OS installation and local task plan."""

from __future__ import annotations

import json
import re
import sys
from pathlib import Path
from typing import Any

try:
    import tomllib
except ModuleNotFoundError:  # pragma: no cover - Python < 3.11 fallback
    try:
        import tomli as tomllib  # type: ignore[no-redef]
    except ModuleNotFoundError as exc:  # pragma: no cover
        raise SystemExit("Python 3.11+ or the 'tomli' package is required.") from exc

ROOT = Path(__file__).resolve().parents[1]
SKILL_NAME_RE = re.compile(r"^[a-z0-9]+(?:-[a-z0-9]+)*$")
AGENT_NAME_RE = re.compile(r"^[a-z0-9]+(?:_[a-z0-9]+)*$")
TASK_ID_RE = re.compile(r"^[A-Z][A-Z0-9_-]*-\d+$")
ALLOWED_MODES = {"advisory", "supervised", "owner_release", "custom"}
ALLOWED_GITHUB_MODES = {"dry-run", "manage-issues", "custom"}
ALLOWED_TASK_STATUSES = {
    "inbox",
    "discovery",
    "ready",
    "blocked",
    "in_progress",
    "internal_review",
    "qa",
    "owner_review",
    "approved",
    "done",
    "released",
    "rework",
    "rejected",
    "cancelled",
}
ALLOWED_RISKS = {"low", "medium", "high", "critical"}


def parse_frontmatter(path: Path) -> dict[str, str]:
    text = path.read_text(encoding="utf-8")
    if not text.startswith("---\n"):
        raise ValueError("missing opening YAML frontmatter delimiter")
    end = text.find("\n---\n", 4)
    if end == -1:
        raise ValueError("missing closing YAML frontmatter delimiter")

    result: dict[str, str] = {}
    for line in text[4:end].splitlines():
        if not line.strip() or line.lstrip().startswith("#"):
            continue
        if ":" not in line:
            raise ValueError(f"invalid frontmatter line: {line!r}")
        key, value = line.split(":", 1)
        result[key.strip()] = value.strip().strip('"\'')
    return result


def load_toml(path: Path) -> dict[str, Any]:
    with path.open("rb") as handle:
        return tomllib.load(handle)


def validate_skills(errors: list[str], warnings: list[str]) -> int:
    skills_dir = ROOT / ".agents" / "skills"
    if not skills_dir.is_dir():
        errors.append("missing .agents/skills directory")
        return 0

    seen: dict[str, Path] = {}
    count = 0
    for skill_file in sorted(skills_dir.glob("*/SKILL.md")):
        count += 1
        try:
            meta = parse_frontmatter(skill_file)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{skill_file.relative_to(ROOT)}: {exc}")
            continue

        name = meta.get("name", "")
        description = meta.get("description", "")
        if not name:
            errors.append(f"{skill_file.relative_to(ROOT)}: missing name")
        elif not SKILL_NAME_RE.fullmatch(name):
            errors.append(f"{skill_file.relative_to(ROOT)}: invalid skill name {name!r}")
        elif name in seen:
            errors.append(
                f"duplicate skill name {name!r}: {seen[name].relative_to(ROOT)} and "
                f"{skill_file.relative_to(ROOT)}"
            )
        else:
            seen[name] = skill_file

        if skill_file.parent.name != name:
            warnings.append(
                f"{skill_file.relative_to(ROOT)}: directory differs from skill name {name!r}"
            )
        if not description:
            errors.append(f"{skill_file.relative_to(ROOT)}: missing description")
        elif len(description) > 1024:
            errors.append(
                f"{skill_file.relative_to(ROOT)}: description has {len(description)} characters; max 1024"
            )
        elif len(description) > 400:
            warnings.append(
                f"{skill_file.relative_to(ROOT)}: long description ({len(description)} chars) may be truncated"
            )

    if count == 0:
        errors.append("no SKILL.md files found under .agents/skills")
    return count


def validate_agents(errors: list[str], warnings: list[str]) -> int:
    agents_dir = ROOT / ".codex" / "agents"
    if not agents_dir.is_dir():
        errors.append("missing .codex/agents directory")
        return 0

    seen: dict[str, Path] = {}
    count = 0
    for agent_file in sorted(agents_dir.glob("*.toml")):
        count += 1
        try:
            data = load_toml(agent_file)
        except Exception as exc:  # noqa: BLE001
            errors.append(f"{agent_file.relative_to(ROOT)}: invalid TOML: {exc}")
            continue

        for required in ("name", "description", "developer_instructions"):
            value = data.get(required)
            if not isinstance(value, str) or not value.strip():
                errors.append(f"{agent_file.relative_to(ROOT)}: missing non-empty {required}")

        name = data.get("name", "")
        if isinstance(name, str) and name:
            if not AGENT_NAME_RE.fullmatch(name):
                errors.append(f"{agent_file.relative_to(ROOT)}: invalid agent name {name!r}")
            if name in seen:
                errors.append(
                    f"duplicate agent name {name!r}: {seen[name].relative_to(ROOT)} and "
                    f"{agent_file.relative_to(ROOT)}"
                )
            else:
                seen[name] = agent_file
            expected_filename = name.replace("_", "-") + ".toml"
            if agent_file.name != expected_filename:
                warnings.append(
                    f"{agent_file.relative_to(ROOT)}: conventional filename would be {expected_filename}"
                )

        sandbox = data.get("sandbox_mode")
        if sandbox not in (None, "read-only", "workspace-write", "danger-full-access"):
            errors.append(f"{agent_file.relative_to(ROOT)}: unknown sandbox_mode {sandbox!r}")
        if sandbox == "danger-full-access":
            warnings.append(f"{agent_file.relative_to(ROOT)}: danger-full-access is not recommended")

    if count == 0:
        errors.append("no custom agent TOML files found under .codex/agents")
    return count


def validate_config(errors: list[str], warnings: list[str]) -> dict[str, Any]:
    config_path = ROOT / "agency" / "agency.config.toml"
    if not config_path.exists():
        errors.append("missing agency/agency.config.toml")
        return {}

    try:
        config = load_toml(config_path)
    except Exception as exc:  # noqa: BLE001
        errors.append(f"agency/agency.config.toml: invalid TOML: {exc}")
        return {}

    mode = config.get("agency", {}).get("mode")
    if mode not in ALLOWED_MODES:
        errors.append(f"agency.mode must be one of {sorted(ALLOWED_MODES)}, got {mode!r}")

    autonomy = config.get("autonomy", {})
    read_agents = autonomy.get("max_parallel_read_agents")
    write_agents = autonomy.get("max_parallel_write_agents")
    if not isinstance(read_agents, int) or read_agents < 1:
        errors.append("autonomy.max_parallel_read_agents must be a positive integer")
    if not isinstance(write_agents, int) or write_agents < 1:
        errors.append("autonomy.max_parallel_write_agents must be a positive integer")
    elif write_agents > 1:
        warnings.append(
            "max_parallel_write_agents > 1: require explicit disjoint ownership and isolated worktrees"
        )

    confidence = autonomy.get("minimum_confidence_to_proceed")
    if not isinstance(confidence, (int, float)) or not 0 <= float(confidence) <= 1:
        errors.append("autonomy.minimum_confidence_to_proceed must be between 0 and 1")

    github = config.get("github", {})
    github_mode = github.get("mode")
    if github_mode not in ALLOWED_GITHUB_MODES:
        errors.append(
            f"github.mode must be one of {sorted(ALLOWED_GITHUB_MODES)}, got {github_mode!r}"
        )
    write_flags = [
        key
        for key, value in github.items()
        if key.startswith("allow_") and isinstance(value, bool) and value
    ]
    if github_mode == "dry-run" and write_flags:
        warnings.append(
            "GitHub write flags are enabled while github.mode is dry-run; sync script will still refuse apply"
        )
    if github.get("allow_merge") and not github.get("allow_pull_request_update"):
        warnings.append("allow_merge is enabled while allow_pull_request_update is false")

    deployment = config.get("deployment", {})
    if deployment.get("allow_production_deploy") and not config.get("approvals", {}).get(
        "required_for_production_release", True
    ):
        warnings.append("production deploy enabled without required owner release approval")

    return config


def validate_plan(errors: list[str], warnings: list[str]) -> tuple[int, int]:
    plan_path = ROOT / "agency" / "state" / "plan.json"
    if not plan_path.exists():
        errors.append("missing agency/state/plan.json")
        return (0, 0)

    try:
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
    except Exception as exc:  # noqa: BLE001
        errors.append(f"agency/state/plan.json: invalid JSON: {exc}")
        return (0, 0)

    if plan.get("schema_version") != 1:
        errors.append("agency/state/plan.json: schema_version must be 1")

    epic = plan.get("epic")
    tasks = plan.get("tasks")
    if epic is not None and not isinstance(epic, dict):
        errors.append("agency/state/plan.json: epic must be an object or null")
    if not isinstance(tasks, list):
        errors.append("agency/state/plan.json: tasks must be an array")
        return (1 if epic else 0, 0)
    if tasks and epic is None:
        errors.append("agency/state/plan.json: non-empty tasks require an epic")

    if isinstance(epic, dict):
        for field in ("id", "title", "objective", "status"):
            if not isinstance(epic.get(field), str) or not epic[field].strip():
                errors.append(f"agency/state/plan.json: epic missing non-empty {field}")
        if isinstance(epic.get("id"), str) and not TASK_ID_RE.fullmatch(epic["id"]):
            errors.append(f"agency/state/plan.json: invalid epic id {epic['id']!r}")

    required_fields = {
        "id",
        "title",
        "objective",
        "owner_agent",
        "depends_on",
        "affected_paths",
        "acceptance_criteria",
        "verification",
        "risk",
        "status",
        "labels",
        "github_issue",
    }
    ids: set[str] = set()
    dependencies: dict[str, list[str]] = {}

    for index, task in enumerate(tasks):
        prefix = f"agency/state/plan.json: tasks[{index}]"
        if not isinstance(task, dict):
            errors.append(f"{prefix} must be an object")
            continue
        missing = required_fields - task.keys()
        if missing:
            errors.append(f"{prefix} missing fields: {', '.join(sorted(missing))}")
            continue

        task_id = task.get("id")
        if not isinstance(task_id, str) or not TASK_ID_RE.fullmatch(task_id):
            errors.append(f"{prefix} has invalid id {task_id!r}")
            continue
        if task_id in ids:
            errors.append(f"{prefix} duplicates task id {task_id}")
        ids.add(task_id)

        for field in ("title", "objective", "owner_agent"):
            if not isinstance(task.get(field), str) or not task[field].strip():
                errors.append(f"{prefix} missing non-empty {field}")

        for field in ("depends_on", "affected_paths", "acceptance_criteria", "verification", "labels"):
            value = task.get(field)
            if not isinstance(value, list) or any(not isinstance(item, str) for item in value):
                errors.append(f"{prefix}.{field} must be an array of strings")
        if isinstance(task.get("acceptance_criteria"), list) and not task["acceptance_criteria"]:
            errors.append(f"{prefix}.acceptance_criteria must not be empty")
        if isinstance(task.get("verification"), list) and not task["verification"]:
            errors.append(f"{prefix}.verification must not be empty")

        risk = task.get("risk")
        if risk not in ALLOWED_RISKS:
            errors.append(f"{prefix}.risk must be one of {sorted(ALLOWED_RISKS)}")
        status = task.get("status")
        if status not in ALLOWED_TASK_STATUSES:
            errors.append(f"{prefix}.status must be one of {sorted(ALLOWED_TASK_STATUSES)}")

        issue = task.get("github_issue")
        if issue is not None and (not isinstance(issue, int) or isinstance(issue, bool) or issue <= 0):
            errors.append(f"{prefix}.github_issue must be a positive integer or null")

        deps = task.get("depends_on")
        if isinstance(deps, list) and all(isinstance(dep, str) for dep in deps):
            dependencies[task_id] = deps

    for task_id, deps in dependencies.items():
        for dep in deps:
            if dep not in ids:
                errors.append(f"task {task_id} depends on unknown task {dep}")
            if dep == task_id:
                errors.append(f"task {task_id} depends on itself")

    # Cycle detection.
    visiting: set[str] = set()
    visited: set[str] = set()

    def visit(task_id: str, trail: list[str]) -> None:
        if task_id in visited:
            return
        if task_id in visiting:
            cycle_start = trail.index(task_id) if task_id in trail else 0
            errors.append("task dependency cycle: " + " -> ".join(trail[cycle_start:] + [task_id]))
            return
        visiting.add(task_id)
        for dep in dependencies.get(task_id, []):
            if dep in dependencies:
                visit(dep, trail + [task_id])
        visiting.remove(task_id)
        visited.add(task_id)

    for task_id in dependencies:
        visit(task_id, [])

    if epic is None and not tasks:
        warnings.append("plan.json is empty; agency-planner must populate it before work synchronization")
    return (1 if epic else 0, len(tasks))


def validate_manifest(errors: list[str], skill_count: int, agent_count: int) -> None:
    path = ROOT / "MANIFEST.json"
    if not path.exists():
        errors.append("missing MANIFEST.json")
        return
    try:
        manifest = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        errors.append(f"MANIFEST.json: invalid JSON: {exc}")
        return

    skills = manifest.get("skills")
    agents = manifest.get("agents")
    if not isinstance(skills, list) or len(skills) != skill_count:
        errors.append("MANIFEST.json skill list does not match discovered skills")
    if not isinstance(agents, list) or len(agents) != agent_count:
        errors.append("MANIFEST.json agent list does not match discovered agents")
    if manifest.get("external_writes_default") != "disabled":
        errors.append("MANIFEST.json must keep external writes disabled by default")


def validate_required_files(errors: list[str], package_mode: bool) -> None:
    installed_required = [
        "README.md",
        "AGENTS.md",
        ".codex/config.toml",
        "agency/WORKFLOW.md",
        "agency/DECISION_RIGHTS.md",
        "agency/ROUTING_MATRIX.md",
        "agency/OWNER_REVIEW_TEMPLATE.md",
        ".github/PULL_REQUEST_TEMPLATE.md",
        ".github/workflows/agency-quality-gate.yml",
        "scripts/install_into_repo.py",
        "scripts/quality_gate.py",
        "scripts/sync_github_tasks.py",
        "scripts/validate_agency.py",
    ]
    package_required = [
        "START_HERE.md",
        "CONTRIBUTING.md",
        "SECURITY.md",
        "CHANGELOG.md",
        "pyproject.toml",
        "docs/ARCHITECTURE.md",
        "docs/INSTALLATION.md",
        "docs/OWNER_PLAYBOOK.md",
        "scripts/publish_to_github.py",
        "tests/test_install_into_repo.py",
        "tests/test_repository.py",
    ]
    required = installed_required + (package_required if package_mode else [])
    for relative in required:
        if not (ROOT / relative).exists():
            errors.append(f"missing required file {relative}")


def main() -> int:
    errors: list[str] = []
    warnings: list[str] = []
    package_mode = (ROOT / "MANIFEST.json").exists()

    skill_count = validate_skills(errors, warnings)
    agent_count = validate_agents(errors, warnings)
    validate_config(errors, warnings)
    epic_count, task_count = validate_plan(errors, warnings)
    if package_mode:
        validate_manifest(errors, skill_count, agent_count)
    validate_required_files(errors, package_mode)

    print("Codex Web Agency OS validation")
    print(f"  root:   {ROOT}")
    print(f"  profile: {'package' if package_mode else 'installed project'}")
    print(f"  skills: {skill_count}")
    print(f"  agents: {agent_count}")
    print(f"  plan:   {epic_count} epic, {task_count} tasks")

    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(f"  - {warning}")

    if errors:
        print("\nErrors:", file=sys.stderr)
        for error in errors:
            print(f"  - {error}", file=sys.stderr)
        print(f"\nFAILED with {len(errors)} error(s).", file=sys.stderr)
        return 1

    print("\nPASS: agency structure and configuration are valid.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
