# Start Epic Development

Fetch a GCWEBRD epic and all its child stories in *Dev Ready* state (or eligible groomed stories in the basic workflow), build an integrated dependency-aware implementation plan, implement everything on a single branch, and open one PR that covers the whole epic.

The epic to develop: $ARGUMENTS

If $ARGUMENTS is empty, stop and ask for an epic key.

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`
- **Vercel project ID:** `prj_OGy3zIYVyZqoiySB5wciCktPVH8q`
- **Vercel team ID:** `team_d5KktjW3qqK4vbNN9aCCIDE1`
- **Branch convention:** `gcwebrd-<number>-<slug>`

## Workflow transitions (with fallback)

| Intent | Preferred | Fallback |
|---|---|---|
| Start work | Start Development | In Progress (id 21) |
| Move epic into Code Review | Create Pull Request | In Progress (id 21) |
| Block | Block | leave status, add label `blocked` |

---

## Step 1: Fetch the Epic and Its Eligible Stories

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()

mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="$ARGUMENTS",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter", "comment"]
)
```

If the issue is not found or not an Epic, report and stop. If found, transition the epic to *In Progress* using *Start Development* (or fallback *In Progress* id 21).

Find all child stories (try parent first, fall back to Epic Link):
```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND parent = $ARGUMENTS ORDER BY created ASC",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter", "comment"]
)

# Fallback:
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND \"Epic Link\" = $ARGUMENTS ORDER BY created ASC"
)
```

Filter to eligible stories:
- Status is **Dev Ready**, OR
- Status is **To Do** with label `groomed` and not `blocked` (basic-workflow fallback)

If none are eligible, report and stop.

For each eligible story, fetch its full ticket to get complete requirements and acceptance criteria.

Display:
```
📋 Epic: $ARGUMENTS — <epic summary>

Eligible stories (<count>):
  1. <KEY> — <summary>
  2. <KEY> — <summary>

Skipped (not Dev Ready / not groomed):
  - <KEY> — <summary> [<status>]
```

---

## Step 2: Build an Integrated Implementation Plan

Read the epic description and all story requirements together. Produce a written plan that:

1. **Identifies shared work** — list any types, utilities, CSS tokens, base components, mappers, or Builder.io registrations multiple stories require. Implement once and share.

2. **Orders stories by dependency:**
   - **Phase 1 — Foundation**: shared types, global CSS additions, shared utilities
   - **Phase 2 — Core components**: leaf-level UI components
   - **Phase 3 — Composite components**: components that compose Phase 2 components, or Builder.io registrations that depend on Phase 2
   - **Phase 4 — Pages / integration**: page-level work, layout changes, feature assembly

3. **Flags conflicts** — if two stories touch the same file (e.g., both modify `styles/globals.css` or `builder-registry.js`), note this and plan the merge strategy.

Print the plan and document it in the epic in Jira so it persists. Steps not tied to a specific story create child tasks under the epic.

```
🗂  Implementation Plan — $ARGUMENTS

Shared work:
  - <item>: needed by <KEY>, <KEY>

Phase 1 — Foundation:
  <KEY>: <summary> → touches <files>

Phase 2 — Core components:
  <KEY>: <summary> → touches <files>

Phase 3 — Composite / Builder registration:
  <KEY>: <summary> → depends on <KEY>

Phase 4 — Pages / integration:
  <KEY>: <summary>

Potential conflicts:
  - <file>: touched by <KEY> and <KEY> — resolve by <strategy>
```

---

## Step 3: Transition All Stories to In Progress

For each eligible story, transition using *Start Development* (preferred) or fallback *In Progress* (id 21):
```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<key>")
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<key>", transition={"id": "<id>"})
```

Do all transitions before writing any code.

---

## Step 4: Create the Branch

```bash
git fetch origin main
BRANCH="<epic-key-lowercase>-<slug>"   # e.g., gcwebrd-30-card-events
git checkout -b $BRANCH origin/main
```

All implementation happens on this single branch in the main working directory (no worktrees — everything lands in one PR).

---

## Step 5: Implement All Stories

Work through the plan in phase order. Within each phase, implement stories sequentially.

For each story:

**a) Read** relevant existing files before touching them.

**b) Implement** only what is needed to satisfy the story's acceptance criteria. Follow CLAUDE.md conventions:
   - Tailwind tokens from `tailwind.config.js`
   - Builder.io registration in `builder-registry.js` + `mappings/` mapper
   - Storybook story under `stories/`
   - Components >100 lines split into `components/[Name]/index.tsx`
   - Top-level `components/` and `pages/` (Pages Router)

**c) Shared work** — if Step 2 identified shared items, implement them when the first story that needs them is processed. Subsequent stories just import.

**d) Commit after each story:**
```bash
git add -p   # or specific files
git commit -m "feat(<KEY>): <brief description>"
```

After all stories are implemented:
```bash
pnpm build && pnpm lint
```

Fix all errors before proceeding.

---

## Step 6: Code Review

```bash
git diff main...HEAD --name-only
git diff main...HEAD
```

Dispatch a `pr-review-toolkit:code-reviewer` subagent. Pass it:
- The full diff and changed file list
- Context: "Next.js 14 Pages Router project with Builder.io and Apollo GraphQL. Conventions: Tailwind tokens from `tailwind.config.js`, Builder.io registration in `builder-registry.js` and `mappings/`, top-level `components/` directory, components >100 lines split into a directory with `index.tsx`, Storybook story per component."

**If no blockers:** Step 7.

**If blockers found:**
1. Fix every issue resolvable without human judgment.
2. `pnpm build && pnpm lint`.
3. Re-dispatch on the updated diff.
4. If clean → Step 7.
5. If unresolved questions remain:
   - Try to transition the **epic** to *Block* (or add label `blocked` as fallback) and post a comment listing fixes made automatically and unresolved items.
   - **Stop.** Do not create a PR.

---

## Step 7: Create the Pull Request

**Determine the next PR number:**
```bash
gh pr list --state all --limit 1 --json number --jq '.[0].number'
```
Next PR = that number + 1. Update `package.json`: keep `MAJOR.MINOR.`, set patch to the PR number.
```bash
git add package.json
git commit -m "chore: bump version for PR #<number>"
```

**Push:**
```bash
git push -u origin <branch-name>
```

**Detect the Vercel preview deployment** (poll up to 3 min, 30s intervals):
```
mcp__claude_ai_Vercel__list_deployments(
  projectId="prj_OGy3zIYVyZqoiySB5wciCktPVH8q",
  teamId="team_d5KktjW3qqK4vbNN9aCCIDE1"
)
mcp__claude_ai_Vercel__get_deployment(
  idOrUrl="<id>",
  teamId="team_d5KktjW3qqK4vbNN9aCCIDE1"
)
```

**Build the PR body** — first person as John Schneider, direct and friendly.

```
## Summary
<2-4 bullet points: what the epic implements and why>

**Epic:** [$ARGUMENTS: <epic summary>](https://radicaldesign.atlassian.net/browse/$ARGUMENTS)

**Stories in this PR:**
| Ticket | Summary |
|--------|---------|
| [<KEY>](https://radicaldesign.atlassian.net/browse/<KEY>) | <summary> |

**Preview:** <deployment-url>

## Changes
<grouped by component/area>

## Test Plan
- [ ] Build passes (`pnpm build && pnpm lint`)
- [ ] <functional check per story AC>

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
```

```bash
gh pr create --title "<epic summary (under 70 chars)>" --body "$(cat <<'EOF'
<body>
EOF
)" --base main
```

---

## Step 8: Update All Jira Stories

For **each** story implemented:

**a) Transition** using *Create Pull Request* (or fallback *In Progress* id 21).
**b) Assign to the reporter** (use `reporter.accountId`).
**c) Add an ADF comment** with hyperlinks to the shared PR and Vercel preview, noting this story was implemented as part of the epic PR.

---

## Step 9: Update the Epic in Jira

**a) Transition the epic** using *Create Pull Request* (or fallback *In Progress* id 21).
**b) Add an ADF comment to the epic** with clickable links to:
- The PR
- The Vercel preview deployment
- The primary route (if a page-level route was implemented)

---

## Step 10: Summary

```
✅ Epic development complete

Epic: $ARGUMENTS — <summary>
Branch: <branch-name>
PR: <pr-url>
Preview: <deployment-url>
Version: <new-version>
Jira: https://radicaldesign.atlassian.net/browse/$ARGUMENTS

Stories implemented (<count>):
  ✅ <KEY> — <summary>
  ...

Skipped (<count>):
  ⏭  <KEY> — <summary> [<status>]
```

---

## Notes

- This command always works on the **main working directory** (no worktrees) because all stories share one branch and one PR.
- Stories must be Dev Ready (or To Do + groomed) to be included. Others are skipped and listed in the summary.
- Implement shared artifacts exactly once — don't duplicate work across stories.
- If the build fails mid-implementation, stop, leave the branch as-is, and do not create a PR or transition tickets.
- Always commit after each story so the git log maps 1:1 to Jira tickets.
- Project key: `GCWEBRD` | Cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- Vercel project ID: `prj_OGy3zIYVyZqoiySB5wciCktPVH8q` | Team ID: `team_d5KktjW3qqK4vbNN9aCCIDE1`
