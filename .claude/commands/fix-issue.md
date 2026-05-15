# Fix Jira Item

Review a GCWEBRD Jira issue and fix it. Behavior depends on the issue type and status:

- **Bug** → create a standalone branch from `main`, implement the fix, create a PR
- **Story/Task in Code Review or Bug Fixing** → check out the existing story branch, find all open linked bugs and subtasks, fix them on that branch, push to update the open PR

The issue to fix: $ARGUMENTS

If $ARGUMENTS is empty, ask for the issue key before proceeding. If the argument is just a number (e.g. `59`) then always append the prefix GCWEBRD- to determne the ticket key, (e.g. `GCWEBRD-59`).

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__` (radicaldesign tenant)
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`
- **Branch convention:** `gcwebrd-<number>-<slug>` (lowercase)
- **Package manager:** `pnpm`

## Workflow transitions (with fallback)

The aspirational GCWEBRD workflow has named transitions like *Start Development*, *Create Pull Request*, *Code Review Feedback*, *Complete Code Review Feedback*. The current Jira config may only expose three global transitions: *To Do* (id 11), *In Progress* (id 21), *Done* (id 31).

For every transition step below: call `getTransitionsForJiraIssue` first, look for the named transition, and if it isn't available, use the matching global fallback.

| Intent | Preferred name | Fallback |
|---|---|---|
| Start work | Start Development | In Progress (21) |
| Mark code review feedback active | Code Review Feedback | In Progress (21) |
| Push back to review | Complete Code Review Feedback | In Progress (21) |
| Mark complete | Done | Done (31) |

---

## Step 1: Fetch the Issue

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()
mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<issue-key>",
  fields=["summary", "description", "issuetype", "status", "priority", "assignee",
          "reporter", "subtasks", "issuelinks", "comment"]
)
```

Determine the **flow** based on issue type and status:

| Condition | Flow |
|-----------|------|
| Issue type is **Bug** | → [Bug Flow](#bug-flow-steps-2b6b) |
| Issue type is **Story** or **Task** AND status is **Code Review** or **Bug Fixing** (or **In Progress** when a PR already exists) | → [Story Flow](#story-flow-steps-2s8s) |
| Story/Task in any other status | Stop. Tell the user: "GCWEBRD-X is in [status]; run `/start-dev` to implement it first, or move it into Code Review/Bug Fixing before using `/fix-issue` for feedback fixes." |

---

## Bug Flow (Steps 2B–6B)

### Step 2B: Understand the Bug

Read the description and any comments to understand:
- What is broken
- Steps to reproduce (if provided)
- Expected vs. actual behavior
- Any linked story for context

If linked to a parent story, fetch that story's description too.

### Step 3B: Create a Standalone Branch

```bash
git fetch origin main

# Branch name: gcwebrd-<number-lowercase>-<short-slug>
git checkout -b gcwebrd-<number>-<slug> origin/main
```

Transition the bug to **In Progress** using the *Start Development* transition (or the *In Progress* fallback).

### Step 4B: Implement the Fix

Explore the codebase and fix the bug:
- Read relevant files before editing
- Make only the changes needed to fix this specific bug — no scope creep
- Follow the conventions in `CLAUDE.md` (Tailwind tokens from `tailwind.config.js`, Builder.io component registration in `builder-registry.js` and `mappings/`, top-level `components/` directory, Pages Router in `pages/`)
- Use `pnpm`

After implementing:
```bash
pnpm build && pnpm lint
# pnpm build-storybook   # only if a build-storybook script exists
```
Fix any errors. Do not proceed if the build fails.

### Step 5B: Create the Pull Request

Follow all steps in `.claude/commands/pr.md`. The workflow auto-detects the GCWEBRD ticket key from the branch name and links the Vercel preview deployment.

### Step 6B: Summary

```
✅ Bug fix complete

**Bug:** <bug-key> — <summary>
- Branch: <branch-name>
- PR: <pr-url>
- Preview: <vercel-deployment-url>
- Jira: https://radicaldesign.atlassian.net/browse/<bug-key>
```

---

## Story Flow (Steps 2S–8S)

This flow handles a story that is **Code Review** or **Bug Fixing** (PR open from `/start-dev`). The user has reviewed the PR, identified issues, and logged them as linked bugs or subtasks. This flow checks out the existing branch and fixes all open linked issues in place.

Note the ticket's current status at the start — it determines which transition to use after fixes are pushed (Step 5S).

### Step 2S: Find Open Linked Issues

From the fetched story, collect all open issues to fix.

**Subtasks** — from `fields.subtasks`:
```
For each subtask where status != "Done":
  getJiraIssue(cloudId="...", issueIdOrKey="<subtask-key>", fields=["summary", "description", "status", "issuetype"])
```

**Linked bugs** — from `fields.issuelinks`:
```
For each issuelink where the linked issue type is "Bug" AND the linked issue status != "Done":
  getJiraIssue(cloudId="...", issueIdOrKey="<linked-key>", fields=["summary", "description", "status", "issuetype"])
```

If no open subtasks or linked bugs are found, report "No open linked issues for GCWEBRD-X. Nothing to fix." and stop.

Display the list of issues to be fixed before proceeding.

### Step 3S: Find and Check Out the Existing Story Branch

Derive the branch name (same convention used by `/start-dev`):
```bash
# Pattern: gcwebrd-<number>-<summary-slug>
BRANCH="gcwebrd-<number>-<slug>"
```

```bash
git fetch origin
git checkout <branch-name>
git pull origin <branch-name>
```

If the branch is not found, look up the open PR for the story:
```bash
gh pr list --state open --json number,headRefName,url \
  --jq ".[] | select(.headRefName | test(\"gcwebrd-<number>\"))"
```

Use the `headRefName` from the PR. If still not found, stop and ask the user to confirm the branch name.

### Step 4S: Fix Each Linked Issue

For each open linked issue (subtasks first, then linked bugs), in sequence:

1. **Read the issue**
2. **Transition to In Progress** (use *Start Development* if available, else *In Progress* fallback)
3. **Implement the fix** — only the changes needed for this specific issue
4. **Commit:**
   ```bash
   git add <changed-files>
   git commit -m "fix: <brief description> (<issue-key>)"
   ```
5. **Transition the issue to Done**
6. **Comment on the linked issue:**
   ```
   addCommentToJiraIssue(
     cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
     issueIdOrKey="<issue-key>",
     contentFormat="markdown",
     commentBody="Fixed in branch `<branch-name>` as part of GCWEBRD-<story-number> PR feedback."
   )
   ```

After all issues are fixed:
```bash
pnpm build && pnpm lint
```
Fix any errors before pushing.

### Step 5S: Push the Branch

```bash
git push origin <branch-name>
```

This automatically updates the already-open PR.

Then transition the **story** ticket based on its original status:
- If the story was **Bug Fixing**: use *Complete Code Review Feedback* (fallback: *In Progress*) → moves back to **Code Review**
- If the story was already **Code Review**: no status change needed
- If the workflow is the basic 3-state config: leave the story in *In Progress*

### Step 6S: Detect Updated Vercel Deployment

```
mcp__claude_ai_Vercel__list_deployments(
  projectId="prj_OGy3zIYVyZqoiySB5wciCktPVH8q",
  teamId="team_d5KktjW3qqK4vbNN9aCCIDE1"
)
```
Filter for the most recent deployment whose `meta.githubCommitRef` matches `<branch-name>`. Poll `get_deployment` until READY (up to 3 minutes, 30s interval). Record the URL.

### Step 7S: Update the Story's Jira Ticket

Add an ADF comment to the **story** with hyperlinks to the updated preview and a bullet list of fixed issues.

### Step 8S: Summary

```
✅ Story feedback fixes complete

**Story:** <story-key> — <summary>
- Branch: <branch-name> (pushed — existing PR updated)
- PR: <existing-pr-url>
- Preview: <updated-deployment-url>
- Jira: https://radicaldesign.atlassian.net/browse/<story-key>

Fixed issues:
- <issue-key>: <summary> → Done
- <issue-key>: <summary> → Done
```

---

## Notes

- **Bug flow** creates a new branch and new PR — independent of any story branch
- **Story flow** works on the existing branch in-place; the open PR is updated on push
- For the story flow, only fix issues explicitly linked to the story (subtasks or issue links) — do not scan by keyword or heuristic
- If a linked issue has no description, add a Jira comment asking for clarification and skip rather than guessing
- Always run `pnpm build && pnpm lint` after all fixes and before pushing
- Use `pnpm`, not npm or yarn
