#!/usr/bin/env python3
"""Safely synchronize agency/state/plan.json with GitHub Issues.

Dry-run is the default. Writes require --apply plus explicit standing permissions in
agency/agency.config.toml. This script intentionally does not merge or deploy.
"""

from __future__ import annotations

import argparse
import json
import re
import shutil
import subprocess
import sys
import tempfile
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
ISSUE_URL_RE = re.compile(r"https?://[^\s]+/issues/(\d+)")
CLOSED_STATUSES = {"done", "released", "cancelled", "rejected"}
LABEL_COLOR = "BFDADC"


class SyncError(RuntimeError):
    pass


def load_toml(path: Path) -> dict[str, Any]:
    with path.open("rb") as handle:
        return tomllib.load(handle)


def run_gh(args: list[str], *, capture: bool = True) -> str:
    command = ["gh", *args]
    process = subprocess.run(
        command,
        cwd=ROOT,
        text=True,
        stdout=subprocess.PIPE if capture else None,
        stderr=subprocess.PIPE if capture else None,
        check=False,
    )
    if process.returncode != 0:
        stderr = (process.stderr or "").strip()
        stdout = (process.stdout or "").strip()
        detail = stderr or stdout or f"exit code {process.returncode}"
        raise SyncError(f"{' '.join(command)} failed: {detail}")
    return (process.stdout or "").strip()


def resolve_repository(configured: str, apply: bool) -> str:
    if configured.strip():
        return configured.strip()
    if shutil.which("gh") is None:
        if apply:
            raise SyncError("GitHub CLI 'gh' is required for --apply")
        return "<current-gh-repository>"
    try:
        return run_gh(["repo", "view", "--json", "nameWithOwner", "--jq", ".nameWithOwner"])
    except SyncError:
        if apply:
            raise
        return "<current-gh-repository>"


def validate_plan(plan_path: Path) -> dict[str, Any]:
    if not plan_path.exists():
        raise SyncError(f"plan not found: {plan_path}")
    try:
        plan = json.loads(plan_path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError) as exc:
        raise SyncError(f"invalid plan JSON: {exc}") from exc

    if plan.get("schema_version") != 1:
        raise SyncError("plan schema_version must be 1")
    if not isinstance(plan.get("tasks"), list):
        raise SyncError("plan.tasks must be an array")
    if plan.get("tasks") and not isinstance(plan.get("epic"), dict):
        raise SyncError("a non-empty task list requires plan.epic")

    ids: set[str] = set()
    for item in ([plan["epic"]] if isinstance(plan.get("epic"), dict) else []) + plan["tasks"]:
        if not isinstance(item, dict):
            raise SyncError("every epic/task must be an object")
        item_id = item.get("id")
        if not isinstance(item_id, str) or not item_id.strip():
            raise SyncError("every epic/task requires a stable id")
        if item_id in ids:
            raise SyncError(f"duplicate item id: {item_id}")
        ids.add(item_id)
        for field in ("title", "objective", "status"):
            if not isinstance(item.get(field), str) or not item[field].strip():
                raise SyncError(f"{item_id} requires a non-empty {field}")
        issue = item.get("github_issue")
        if issue is not None and (not isinstance(issue, int) or isinstance(issue, bool) or issue <= 0):
            raise SyncError(f"{item_id}.github_issue must be a positive integer or null")

    task_ids = {task["id"] for task in plan["tasks"]}
    for task in plan["tasks"]:
        criteria = task.get("acceptance_criteria")
        verification = task.get("verification")
        depends = task.get("depends_on", [])
        if not isinstance(criteria, list) or not criteria:
            raise SyncError(f"{task['id']} needs acceptance_criteria")
        if not isinstance(verification, list) or not verification:
            raise SyncError(f"{task['id']} needs verification")
        if not isinstance(depends, list):
            raise SyncError(f"{task['id']}.depends_on must be an array")
        unknown = [dep for dep in depends if dep not in task_ids]
        if unknown:
            raise SyncError(f"{task['id']} has unknown dependencies: {', '.join(unknown)}")
    return plan


def checkbox_lines(values: list[str]) -> str:
    return "\n".join(f"- [ ] {value}" for value in values) if values else "- [ ] Not specified"


def bullet_lines(values: list[str]) -> str:
    return "\n".join(f"- {value}" for value in values) if values else "- None"


def issue_body(
    item: dict[str, Any],
    *,
    is_epic: bool,
    epic: dict[str, Any] | None,
    task_issue_by_id: dict[str, int],
) -> str:
    item_id = item["id"]
    lines = [
        f"<!-- agency-task-id: {item_id} -->",
        "",
        f"# {item['title']}",
        "",
        "## Objective",
        "",
        str(item["objective"]),
        "",
        "## Agency state",
        "",
        f"- Stable ID: `{item_id}`",
        f"- Status: `{item.get('status', 'inbox')}`",
        f"- Risk: `{item.get('risk', 'not-classified')}`",
    ]

    if is_epic:
        lines.extend(
            [
                "",
                "## Owner outcome",
                "",
                str(item["objective"]),
                "",
                "## Completion",
                "",
                "The epic is complete only after child acceptance criteria, internal quality gates, owner acceptance, and the configured release state.",
            ]
        )
    else:
        parent_ref = "not synchronized"
        if epic:
            parent_ref = (
                f"#{epic['github_issue']}" if epic.get("github_issue") else f"`{epic.get('id', 'unknown')}`"
            )
        dependencies: list[str] = item.get("depends_on", [])
        dependency_refs = [
            f"#{task_issue_by_id[dep]} (`{dep}`)" if dep in task_issue_by_id else f"`{dep}`"
            for dep in dependencies
        ]
        lines.extend(
            [
                f"- Accountable role: `{item.get('owner_agent', 'unassigned')}`",
                f"- Parent epic: {parent_ref}",
                "",
                "## Dependencies",
                "",
                bullet_lines(dependency_refs),
                "",
                "## Ownership boundaries",
                "",
                bullet_lines(item.get("affected_paths", [])),
                "",
                "## Acceptance criteria",
                "",
                checkbox_lines(item.get("acceptance_criteria", [])),
                "",
                "## Verification",
                "",
                bullet_lines(item.get("verification", [])),
            ]
        )

    lines.extend(
        [
            "",
            "---",
            "Managed from `agency/state/plan.json`. Do not remove the hidden stable-ID marker.",
        ]
    )
    return "\n".join(lines) + "\n"


def current_labels(repo: str) -> set[str]:
    raw = run_gh(["label", "list", "--repo", repo, "--limit", "1000", "--json", "name"])
    try:
        return {entry["name"] for entry in json.loads(raw)}
    except (json.JSONDecodeError, KeyError, TypeError) as exc:
        raise SyncError(f"could not parse GitHub labels: {exc}") from exc


def prepare_labels(
    desired: list[str],
    *,
    repo: str,
    existing: set[str],
    allow_manage: bool,
) -> tuple[list[str], list[str]]:
    usable: list[str] = []
    missing: list[str] = []
    for label in desired:
        if label in existing:
            usable.append(label)
            continue
        missing.append(label)
        if allow_manage:
            run_gh(
                [
                    "label",
                    "create",
                    label,
                    "--repo",
                    repo,
                    "--color",
                    LABEL_COLOR,
                    "--description",
                    "Managed by Codex Web Agency OS",
                ]
            )
            existing.add(label)
            usable.append(label)
    return usable, missing


def write_body_temp(body: str) -> Path:
    handle = tempfile.NamedTemporaryFile(
        mode="w", encoding="utf-8", suffix=".md", prefix="agency-issue-", delete=False
    )
    try:
        handle.write(body)
        return Path(handle.name)
    finally:
        handle.close()


def create_issue(repo: str, item: dict[str, Any], body: str, labels: list[str]) -> int:
    body_path = write_body_temp(body)
    try:
        args = [
            "issue",
            "create",
            "--repo",
            repo,
            "--title",
            item["title"],
            "--body-file",
            str(body_path),
        ]
        for label in labels:
            args.extend(["--label", label])
        output = run_gh(args)
    finally:
        body_path.unlink(missing_ok=True)

    matches = ISSUE_URL_RE.findall(output)
    if not matches:
        raise SyncError(f"GitHub did not return a recognizable issue URL: {output!r}")
    return int(matches[-1])


def update_issue(repo: str, issue: int, item: dict[str, Any], body: str, labels: list[str]) -> None:
    body_path = write_body_temp(body)
    try:
        args = [
            "issue",
            "edit",
            str(issue),
            "--repo",
            repo,
            "--title",
            item["title"],
            "--body-file",
            str(body_path),
        ]
        for label in labels:
            args.extend(["--add-label", label])
        run_gh(args)
    finally:
        body_path.unlink(missing_ok=True)


def item_summary(item: dict[str, Any], operation: str, labels: list[str]) -> None:
    issue = item.get("github_issue")
    issue_text = f"#{issue}" if issue else "new issue"
    print(f"  {operation:8} {item['id']:12} {issue_text:12} {item['title']}")
    if labels:
        print(f"             labels: {', '.join(labels)}")


def save_plan(plan_path: Path, plan: dict[str, Any]) -> None:
    plan_path.write_text(json.dumps(plan, indent=2) + "\n", encoding="utf-8")


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--apply", action="store_true", help="Apply authorized GitHub issue writes.")
    parser.add_argument(
        "--plan",
        type=Path,
        default=ROOT / "agency" / "state" / "plan.json",
        help="Path to the agency plan JSON.",
    )
    args = parser.parse_args()

    config = load_toml(ROOT / "agency" / "agency.config.toml")
    github = config.get("github", {})
    plan_path = args.plan.resolve()

    try:
        plan = validate_plan(plan_path)
        repo = resolve_repository(str(github.get("repository", "")), args.apply)
    except SyncError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 2

    epic = plan.get("epic")
    tasks: list[dict[str, Any]] = plan.get("tasks", [])
    if epic is None and not tasks:
        print("No epic or tasks in the plan. Run agency-planner first.")
        return 0

    print("GitHub issue synchronization")
    print(f"  mode:       {'APPLY' if args.apply else 'DRY-RUN'}")
    print(f"  repository: {repo}")
    print(f"  plan:       {plan_path}")

    if not args.apply:
        task_issue_by_id = {
            task["id"]: task["github_issue"]
            for task in tasks
            if isinstance(task.get("github_issue"), int)
        }
        for item in ([epic] if isinstance(epic, dict) else []) + tasks:
            operation = "UPDATE" if item.get("github_issue") else "CREATE"
            item_summary(item, operation, item.get("labels", []))
        print("\nDry-run only. No GitHub data was changed.")
        print("Enable manage-issues permissions in agency.config.toml and rerun with --apply.")
        return 0

    if github.get("mode") != "manage-issues":
        print("ERROR: --apply requires github.mode = 'manage-issues'", file=sys.stderr)
        return 3
    if shutil.which("gh") is None:
        print("ERROR: GitHub CLI 'gh' is not installed", file=sys.stderr)
        return 3

    try:
        run_gh(["auth", "status"], capture=True)
        labels_existing = current_labels(repo)
    except SyncError as exc:
        print(f"ERROR: {exc}", file=sys.stderr)
        return 3

    allow_create = bool(github.get("allow_issue_create"))
    allow_update = bool(github.get("allow_issue_update"))
    allow_close = bool(github.get("allow_issue_close"))
    allow_label_management = bool(github.get("allow_label_management"))
    failures: list[str] = []
    missing_labels_total: set[str] = set()

    # Epic first so task bodies can reference it.
    ordered: list[tuple[dict[str, Any], bool]] = []
    if isinstance(epic, dict):
        ordered.append((epic, True))
    ordered.extend((task, False) for task in tasks)

    for item, is_epic in ordered:
        issue = item.get("github_issue")
        if issue and not allow_update:
            item_summary(item, "SKIP", item.get("labels", []))
            failures.append(f"{item['id']}: update permission is disabled")
            continue
        if not issue and not allow_create:
            item_summary(item, "SKIP", item.get("labels", []))
            failures.append(f"{item['id']}: create permission is disabled")
            continue

        try:
            usable_labels, missing = prepare_labels(
                item.get("labels", []),
                repo=repo,
                existing=labels_existing,
                allow_manage=allow_label_management,
            )
            missing_labels_total.update(label for label in missing if label not in usable_labels)
            task_issue_by_id = {
                task["id"]: task["github_issue"]
                for task in tasks
                if isinstance(task.get("github_issue"), int)
            }
            body = issue_body(
                item,
                is_epic=is_epic,
                epic=epic if isinstance(epic, dict) else None,
                task_issue_by_id=task_issue_by_id,
            )

            if issue:
                update_issue(repo, issue, item, body, usable_labels)
                item_summary(item, "UPDATED", usable_labels)
            else:
                issue = create_issue(repo, item, body, usable_labels)
                item["github_issue"] = issue
                save_plan(plan_path, plan)
                item_summary(item, "CREATED", usable_labels)

            if item.get("status") in CLOSED_STATUSES:
                if allow_close:
                    run_gh(["issue", "close", str(issue), "--repo", repo])
                    print(f"             closed: #{issue} ({item.get('status')})")
                else:
                    print(
                        f"             note: status is {item.get('status')}, but allow_issue_close is false"
                    )
        except SyncError as exc:
            failures.append(f"{item['id']}: {exc}")
            print(f"  ERROR    {item['id']:12} {exc}", file=sys.stderr)

    save_plan(plan_path, plan)

    if missing_labels_total:
        print("\nMissing labels were omitted (label management disabled):")
        for label in sorted(missing_labels_total):
            print(f"  - {label}")

    if failures:
        print("\nSynchronization completed with blockers:", file=sys.stderr)
        for failure in failures:
            print(f"  - {failure}", file=sys.stderr)
        return 1

    print("\nSynchronization complete. No merge, release, or deployment action was performed.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
