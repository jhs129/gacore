# PR Feedback Handler

Address pull request review comments. Accepts an optional PR number (e.g. `/pr-feedback 42`) — when given, checks out that PR's branch in a git worktree and works there. Without an argument, operates on the current branch's open PR.

Read every reviewer comment on the PR and make the appropriate code changes. Work systematically — don't skip comments or make partial fixes.

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`
- **Branch convention:** `gcwebrd-<number>-<slug>`
- **Package manager:** `pnpm`

## Workflow transitions (with fallback)

| Intent | Preferred | Fallback |
|---|---|---|
| Mark feedback active | Code Review Feedback (Code Review → Bug Fixing) | In Progress (id 21) |
| Push back to review | Complete Code Review Feedback (Bug Fixing → Code Review) | In Progress (id 21) |

---

## Step 1: Identify the PR and set up working directory

**If a PR number was provided** (e.g. `/pr-feedback 42`):

1. Fetch the PR's branch name:
   ```bash
   gh pr view <number> --json headRefName,baseRefName,title,url --jq '{branch: .headRefName, base: .baseRefName, title: .title, url: .url}'
   ```
2. Create a worktree:
   ```bash
   git fetch origin <branch>
   git worktree add ../<branch> origin/<branch>
   ```
3. All file reads/edits happen inside the worktree path. Run build/lint from there too.
4. When done, **remove the worktree** (do NOT delete the branch):
   ```bash
   git worktree remove ../<branch>
   ```

**If no PR number was provided**, run in the current directory:
```bash
gh pr view --json number,title,url,headRefName,baseRefName
```
If there's no open PR for the current branch, tell the user and stop.

---

## Step 2: Detect and update the associated Jira ticket

Extract the ticket key from the PR branch name (`gcwebrd-NNN-*` → `GCWEBRD-NNN`).

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()
mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields=["summary", "status"]
)
```

If the ticket is in **Code Review** (or **In Progress** in the basic workflow), transition it to **Bug Fixing** using *Code Review Feedback* if available, else fall back to *In Progress* (id 21):
```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>")
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>", transitionId="<id>")
```

If the ticket is already in **Bug Fixing**, skip the transition.
If no ticket key can be extracted from the branch name, skip and continue.

---

## Step 3: Check for and resolve merge conflicts

```bash
gh pr view <number> --json mergeable,mergeStateStatus --jq '{mergeable: .mergeable, state: .mergeStateStatus}'
```

If `mergeable` is `CONFLICTING`:

1. Make sure you're in the right working directory.
2. Fetch and merge the base branch:
   ```bash
   git fetch origin
   git merge origin/<baseRefName>
   ```
3. For each conflicted file, read the file, find `<<<<<<<`, `=======`, `>>>>>>>` markers, and resolve by understanding what both sides changed.
4. After resolving:
   ```bash
   git add <resolved-files>
   git merge --continue
   ```
5. Run the build:
   ```bash
   pnpm build && pnpm lint
   ```

If `mergeable` is `MERGEABLE` or `UNKNOWN`, skip this step.

---

## Step 4: Fetch all comments

Run in parallel:

**General PR comments:**
```bash
gh pr view <number> --json comments --jq '.comments[] | {author: .author.login, body: .body}'
```

**Inline review comments** (line-specific):
```bash
gh api repos/$(gh repo view --json nameWithOwner --jq '.nameWithOwner')/pulls/<number>/comments \
  --jq '.[] | {path: .path, line: .line, originalLine: .original_line, body: .body, author: .user.login, diffHunk: .diff_hunk}'
```

**Review-level summary comments:**
```bash
gh api repos/$(gh repo view --json nameWithOwner --jq '.nameWithOwner')/pulls/<number>/reviews \
  --jq '.[] | select(.body != "") | {author: .user.login, body: .body, state: .state}'
```

---

## Step 5: Analyze comments

Categorize each comment:
- **Actionable change** → implement
- **Question** → usually no code change, but consider if clarity could be improved
- **Praise** → skip
- **Discussion** that's already resolved → skip

For inline comments, use the `diffHunk` to understand what the reviewer is reacting to.

---

## Step 6: Implement the changes

Work through each actionable comment. Read the full file context before editing.

### Common feedback patterns

**"Move this to a shared library / utility"**
- Create or update the appropriate file (`lib/`, `utils/`, etc.)
- Export the extracted function
- Update every call site — not just the flagged one

**"This should be reusable"**
- Identify the reusable concern
- Extract into a named function in the right shared location
- Update all current usages

**"Naming should be clearer"**
- Rename across all usages, not just the flagged line

**"This is inconsistent with how we do X elsewhere"**
- Find the established pattern in the codebase and align

**"Split this component / this file is too large"**
- Per CLAUDE.md: components >100 lines split into a directory with `index.tsx` and the Props interface

---

## Step 7: Build and lint

From the working directory (worktree if a PR number was given):
```bash
pnpm build && pnpm lint
```

Fix any errors before proceeding. If the build was already broken before your changes, note that separately.

---

## Step 8: Report back

Summarize what you did:
- For each comment addressed: what the feedback was and what you changed
- For any comment skipped: why
- Any follow-up questions needing user input

Do NOT push, commit, or create a new PR unless the user explicitly asks.

---

## Step 9: Transition Jira ticket after push (when user confirms)

When the user asks you to push, after pushing successfully, transition the ticket back from **Bug Fixing** to **Code Review** using *Complete Code Review Feedback* (or fallback *In Progress* id 21):

```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>")
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>", transitionId="<id>")
```

Add a comment summarizing the fixes:
```
addCommentToJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  contentFormat="markdown",
  commentBody="**PR feedback addressed — moved back to Code Review.**\n\n<bullet list of changes made>"
)
```
