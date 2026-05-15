# Create Pull Request (with Jira + Vercel Integration)

Create a pull request for the current branch. If the branch name follows the GCWEBRD ticket convention used by `/fix-issue` or `/start-dev` (e.g. `gcwebrd-10-card-events`), fetch the Jira ticket and include a link and summary in the PR description.

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`
- **Vercel project ID:** `prj_OGy3zIYVyZqoiySB5wciCktPVH8q`
- **Vercel team ID:** `team_d5KktjW3qqK4vbNN9aCCIDE1`
- **Branch convention:** `gcwebrd-<number>-<slug>`
- **Package manager:** `pnpm`

## Workflow transitions (with fallback)

| Intent | Preferred transition | Fallback |
|---|---|---|
| Move ticket into Code Review | Create Pull Request | In Progress (id 21) |
| Mark blocked | Block | leave status, add label `blocked` |

---

## Step 1: Read the Current Branch and Git State

Run in parallel:
```bash
git branch --show-current
git status
git log --oneline main..HEAD
git diff main...HEAD --stat
```

Branch-name pattern: `^([a-zA-Z]+-\d+)(-.*)?$`. Examples that match:
- `gcwebrd-10-card-events` → `GCWEBRD-10`
- `gcwebrd-3` → `GCWEBRD-3`
- `feature/gcwebrd-5-search` → `GCWEBRD-5`

If no match, skip Jira steps entirely.

---

## Step 2: Fetch the Jira Ticket (if applicable)

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()
mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields=["summary", "description", "issuetype", "status", "priority", "reporter"]
)
```

Extract the summary and acceptance criteria from the description for the PR body.

---

## Step 3: Verify the Build is Clean

```bash
pnpm build && pnpm lint
# pnpm build-storybook   # if a build-storybook script exists
```

If the build fails, stop and tell the user to fix the errors before creating the PR.

---

## Step 4: Code Review

```bash
git diff main...HEAD --name-only
git diff main...HEAD
```

Dispatch a `pr-review-toolkit:code-reviewer` subagent. Pass it:
- The full output of `git diff main...HEAD`
- The changed file list
- This context: "Next.js 14 Pages Router project with Builder.io and Apollo GraphQL. Conventions: use Tailwind CSS tokens from `tailwind.config.js` (never hardcode hex or arbitrary `bg-[#xxx]`), Builder.io component registration is in `builder-registry.js` and `mappings/` (mapper components live there), top-level `components/` directory grouped by feature (forms, hero, layout, ohcomponent, search, ui), pages in top-level `pages/` directory using Pages Router with some App Router under `app/`, components >100 lines split into their own directory with `index.tsx`, simple interface definitions (no `Omit`/`NonNullable`), Storybook stories in `stories/`."

**If no blockers:** Proceed to Step 5.

**If blockers found:**
1. Fix every issue resolvable without human judgment.
2. `pnpm build && pnpm lint` — fix any errors.
3. Re-dispatch the `pr-review-toolkit:code-reviewer` subagent on the updated diff.
4. If clean → Step 5.
5. If unresolved questions remain:
   - If a Jira ticket was found, try to transition it to *Block* (or add label `blocked` as fallback) and post a comment listing fixes made automatically and the unresolved items needing human input.
   - **Stop.** Do not push or create a PR.

---

## Step 5: Determine the Next PR Number and Update the Version

```bash
gh pr list --state all --limit 1 --json number --jq '.[0].number'
```

Next PR number = that value + 1 (or 1 if none exist).

Update `package.json`: keep `MAJOR.MINOR.` prefix, set patch to the PR number (e.g. `0.1.0` + PR #12 → `0.1.12`).

```bash
git add package.json
git commit -m "chore: bump version for PR #<number>"
```

---

## Step 6: Push the Branch

```bash
git push -u origin <branch-name>
```

---

## Step 7: Detect the Vercel Preview Deployment

Vercel automatically triggers a preview deployment after push. Poll for it:

```
mcp__claude_ai_Vercel__list_deployments(
  projectId="prj_OGy3zIYVyZqoiySB5wciCktPVH8q",
  teamId="team_d5KktjW3qqK4vbNN9aCCIDE1"
)
```

Filter the result for the most recent deployment whose `meta.githubCommitRef` matches `<branch-name>`. If not yet `READY`, wait up to 3 minutes and re-poll every 30 seconds:
```
mcp__claude_ai_Vercel__get_deployment(
  idOrUrl="<deployment-id>",
  teamId="team_d5KktjW3qqK4vbNN9aCCIDE1"
)
```

Once ready, record the primary deployment URL.

If detection times out, note the failure but do not block PR creation.

---

## Step 8: Build the PR Title and Body

**Title:** Use the Jira ticket summary if available, otherwise derive a concise title (under 70 chars) from the branch slug and git log.

**Body:** Write in first person as if John Schneider wrote it — friendly, direct.

Structure:
```
## Summary
<1-3 bullet points describing what changed and why>

<If Jira ticket found:>
**Jira:** [<TICKET-KEY>: <ticket summary>](https://radicaldesign.atlassian.net/browse/<TICKET-KEY>)

<If Vercel deployment detected:>
**Preview:** <deployment-url>

## Changes
<bullet list of files or areas changed with brief descriptions>

## Test Plan
- [ ] Build passes (`pnpm build && pnpm lint`)
- [ ] <specific functional check based on the changes>
- [ ] <additional verification steps derived from the AC in the Jira ticket>

🤖 Generated with [Claude Code](https://claude.ai/claude-code)
```

---

## Step 9: Create the PR

```bash
gh pr create --title "<title>" --body "$(cat <<'EOF'
<body>
EOF
)"
```

Use `--base main` if not auto-detected.

---

## Step 10: Update the Jira Ticket (if applicable)

**a) Transition.** Try *Create Pull Request*; fall back to *In Progress* (id 21):
```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>")
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>", transitionId="<id>")
```

**b) Assign to the reporter** (use the `reporter.accountId` from Step 2):
```
editJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields={ "assignee": { "accountId": "<reporter-account-id>" } }
)
```

**c) Add an ADF comment with hyperlinks** to the PR and (if available) the Vercel preview:
```
addCommentToJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  contentFormat="adf",
  commentBody={
    "type": "doc",
    "version": 1,
    "content": [
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "PR ready for review: " },
          { "type": "text", "text": "<pr-url>", "marks": [{ "type": "link", "attrs": { "href": "<pr-url>" } }] }
        ]
      },
      {
        "type": "paragraph",
        "content": [
          { "type": "text", "text": "Preview deployment: " },
          { "type": "text", "text": "<deployment-url>", "marks": [{ "type": "link", "attrs": { "href": "https://<deployment-url>" } }] }
        ]
      }
    ]
  }
)
```

---

## Step 11: Show the Result

```
✅ Pull request created

**PR:** <title> — <pr-url>
**Branch:** <branch-name>
**Version:** <new-version>
**Preview:** <deployment-url>
<If Jira:>
**Jira:** https://radicaldesign.atlassian.net/browse/<ticket-key> (PR + deployment links added)
```

---

## Notes

- If there are uncommitted changes, warn the user and ask if they want to commit them first. Do not silently stash or discard anything.
- If the branch is already pushed and has an open PR, show the existing PR URL and stop.
- Always look at ALL commits on the branch (not just the latest) when writing the PR description.
- Vercel project ID: `prj_OGy3zIYVyZqoiySB5wciCktPVH8q` | Team ID: `team_d5KktjW3qqK4vbNN9aCCIDE1`
- Project key: `GCWEBRD` | Cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
