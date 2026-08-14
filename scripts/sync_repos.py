#!/usr/bin/env python3
"""Rebuild the auto-generated repo list in readme.md from the live GitHub API.

Run by .github/workflows/sync-repos.yml on a daily schedule (and manually via
workflow_dispatch). Requires a GH_TOKEN env var with at least public read access.
"""
import json
import os
import re
import sys
import urllib.request
from datetime import datetime, timezone

USERNAME = "kushagra486"
README_PATH = "readme.md"
# Repos that aren't "projects" to showcase: the profile-readme repo and this
# portfolio repo itself.
EXCLUDE = {"kushagra486", "kushagra486.github.io"}

START_MARKER = "<!-- AUTO-REPOS:START -->"
END_MARKER = "<!-- AUTO-REPOS:END -->"


def fetch_repos(token: str) -> list[dict]:
    url = f"https://api.github.com/users/{USERNAME}/repos?per_page=100&sort=updated"
    req = urllib.request.Request(
        url,
        headers={
            "Authorization": f"Bearer {token}",
            "Accept": "application/vnd.github+json",
        },
    )
    with urllib.request.urlopen(req) as resp:
        return json.load(resp)


def build_table(repos: list[dict]) -> tuple[str, int]:
    kept = [r for r in repos if not r["fork"] and r["name"] not in EXCLUDE]
    kept.sort(key=lambda r: r["pushed_at"], reverse=True)

    rows = ["| Repo | Description | Language | Stars | Last Push |", "|---|---|---|---|---|"]
    for r in kept:
        desc = (r["description"] or "—").replace("|", "\\|").replace("\n", " ")
        lang = r["language"] or "—"
        pushed = r["pushed_at"].split("T")[0]
        rows.append(f"| [{r['name']}]({r['html_url']}) | {desc} | {lang} | {r['stargazers_count']} | {pushed} |")

    return "\n".join(rows), len(kept)


def main() -> None:
    token = os.environ.get("GH_TOKEN")
    if not token:
        print("GH_TOKEN not set", file=sys.stderr)
        sys.exit(1)

    repos = fetch_repos(token)
    table, count = build_table(repos)
    synced_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")

    block = (
        f"{START_MARKER}\n"
        f"_Synced automatically from GitHub — {count} public repositories, last synced {synced_at}._\n\n"
        f"{table}\n"
        f"{END_MARKER}"
    )

    text = open(README_PATH, encoding="utf-8").read()
    pattern = re.compile(re.escape(START_MARKER) + r".*?" + re.escape(END_MARKER), re.DOTALL)
    if not pattern.search(text):
        print("AUTO-REPOS markers not found in readme.md", file=sys.stderr)
        sys.exit(1)

    open(README_PATH, "w", encoding="utf-8").write(pattern.sub(block, text))


if __name__ == "__main__":
    main()
