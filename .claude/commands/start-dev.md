# Start Development on Dev Ready Tickets

Pick up GCWEBRD tickets in *Dev Ready* status (or eligible *To Do* tickets in the basic 3-state workflow), implement them in parallel git worktrees, and create pull requests. Each worktree is removed after the PR is created.

The ticket(s) to develop: $ARGUMENTS

If $ARGUMENTS is empty, query the eligible queue. If a ticket key is provided (e.g. `GCWEBRD-58`), process only that ticket. If the argument is just a number (e.g. `59`) then always append the prefix GCWEBRD- to determne the ticket key, (e.g. `GCWEBRD-59`).
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

| Intent | Preferred | Fallback |
|---|---|---|
| Start work (Dev Ready → In Progress) | Start Development | In Progress (id 21) |

---

## Step 1: Resolve the Ticket List

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()
```

If $ARGUMENTS is empty, query the Dev Ready queue. Try in order; use the first that returns results:

```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND status = \"Dev Ready\" ORDER BY created ASC"
)
```

Fallback (basic workflow — pick `To Do` tickets that have already been groomed):
```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND status = \"To Do\" AND labels in (groomed) AND labels not in (blocked) ORDER BY created ASC"
)
```

If $ARGUMENTS is a ticket key, fetch that single ticket.

If no tickets are found, report and stop.

Report the list of tickets found before proceeding.

---

## Step 2: Transition All Tickets to In Progress

For each ticket, immediately transition it to **In Progress** using *Start Development* (preferred) or fall back to *In Progress* (id 21):

```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>")
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>", transitionId="<id>")
```

Do this for all tickets before creating any worktrees.

---

## Step 3: Process Each Ticket

**Single ticket:** Perform Steps 4–9 directly in this session.

**Multiple tickets:** Invoke `superpowers:dispatching-parallel-agents`. Dispatch one subagent per ticket. Each subagent prompt must include:
- The specific ticket key
- The Atlassian cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- The Atlassian MCP prefix: `mcp__claude_ai_Atlassian_Rovo__`
- The Vercel project ID: `prj_OGy3zIYVyZqoiySB5wciCktPVH8q` and team ID: `team_d5KktjW3qqK4vbNN9aCCIDE1`
- The main repo root path (use `git rev-parse --show-toplevel` if needed)
- The complete instructions from Steps 4–9 below, verbatim

Wait for all subagents, then display the Step 10 Summary with collated results.

---

## Step 4: Create a Git Worktree

From the main repo directory:

```bash
git fetch origin main

# Branch name: gcwebrd-<number>-<slug>
# e.g., GCWEBRD-58 "Card Events Vertical Component" → gcwebrd-58-card-events-vertical
BRANCH="gcwebrd-<number>-<slug>"

git worktree add ../<branch-name> -b <branch-name> origin/main
```

All subsequent work for this ticket happens inside `../<branch-name>/`.

---

## Step 5: Fetch Ticket Requirements

```
mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields=["summary", "description", "issuetype", "status", "comment"]
)
```

Parse the description to extract:
- The user story
- The requirements list
- The acceptance criteria checklist

### Step 5a: Pull Figma design context (if a Figma URL is present)

Scan the ticket description and comments for any URL matching `figma.com/(design|file|board|deck|slides)/...`. For each one:

1. **Parse the URL** — extract `fileKey` (path segment after `/design/`, `/file/`, etc.) and `nodeId` from the `?node-id=…` query param. Convert dashes to colons in the node id (e.g. `51-3443` → `51:3443`).
2. **Invoke the figma-implement-design skill** *before* any Figma MCP call:
   ```
   Skill(name="figma:figma-implement-design")
   ```
   This skill teaches the right way to translate Figma into code for this stack and is mandatory for design-driven implementation.
3. **Fetch the design context** for the implementation:
   ```
   mcp__plugin_figma_figma__get_metadata(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_design_context(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_screenshot(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_variable_defs(fileKey="<fileKey>", nodeId="<nodeId>")
   ```
4. **Use the design context** in Step 6 implementation:
   - Treat the Figma frame as the visual source of truth — the ticket description is the *intent*, the Figma node is the *spec*. If they conflict, prefer the design and flag the discrepancy in the PR description.
   - Map Figma variables (colors, spacing, radii, type) to existing tokens in `tailwind.config.js`. If a token doesn't exist yet, add it to `tailwind.config.js` rather than hardcoding the value in the component.
   - Implement every variant / state shown in the frame (hover, active, disabled, mobile/tablet/desktop) — not just the default.
   - Use exact copy from the design where text is visible.
5. **If the Figma fetch fails** (private link, invalid node id, MCP error): stop, post a comment to the Jira ticket noting the failure, and ask the user to verify the link before resuming. Do not proceed to implementation guessing at the design.

---

## Step 6: Implement the Solution

Inside the worktree, explore and implement:

- Read relevant files before editing
- Follow CLAUDE.md conventions:
  - Tailwind tokens from `tailwind.config.js` (never hardcode hex)
  - Builder.io component registration goes in `builder-registry.js` and corresponding mapper in `mappings/`
  - Top-level `components/` directory grouped by feature (`forms`, `hero`, `layout`, `ohcomponent`, `search`, `ui`)
  - Pages live in top-level `pages/` (Pages Router) — `app/` is reserved for the GraphQL route handler
  - Components >100 lines split into `components/[Name]/index.tsx` with co-located sub-components
  - Simple interface definitions (no `Omit`/`NonNullable`)
- Use `pnpm`

**If this ticket introduces or modifies a UI component:**
- Register in `builder-registry.js`
- Add a mapper in `mappings/` if it bridges Builder.io content to a presentational component
- Add a Storybook story under `stories/`

After implementing:
```bash
pnpm build && pnpm lint
# pnpm build-storybook   # if a build-storybook script exists
```

Fix any errors before proceeding. Do not create a PR if the build fails.

---

## Step 7: Create the Pull Request

From inside the worktree, follow `.claude/commands/pr.md`. The branch name follows the GCWEBRD convention so the workflow auto-detects the ticket key.

The workflow will: verify the build, run code review, bump the version, push the branch, create the PR, detect the Vercel preview deployment, and post the PR + deployment links to the Jira ticket.

---

## Step 8: Clean Up the Worktree

After the PR is created successfully:

```bash
cd <main-repo-root>
git worktree remove ../<branch-name> --force
git worktree list   # verify
```

The branch and PR remain intact on the remote.

---

## Step 9: Summary

```
✅ Development complete

Processed X ticket(s):

[For each ticket:]
**<TICKET-KEY>** — <Summary>
- Branch: <branch-name> (pushed to remote)
- PR: <pr-url>
- Preview: <vercel-deployment-url>
- Jira: https://radicaldesign.atlassian.net/browse/<TICKET-KEY> (Code Review)
- Worktree: removed ✓
```

---

## Notes

- Always remove the worktree after PR creation — never leave them around
- If the build fails, stop and report errors without creating a PR or removing the worktree (leave it for debugging)
- Branch naming: `gcwebrd-<number>-<short-slug>` (lowercase)
- Main repo root: use `git rev-parse --show-toplevel` if needed
- Always use `pnpm`
