# Groom Epic

Fetch a GCWEBRD Jira epic and all its child stories, display an overview, then run the `/groom` workflow on each child story in parallel — using the epic description as shared context so each story's acceptance criteria aligns with the epic goal.

The epic to groom: $ARGUMENTS

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`

---

## Step 1: Fetch the Epic

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()

mcp__claude_ai_Atlassian_Rovo__getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="$ARGUMENTS",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter", "comment"]
)
```

If the issue is not found or is not an Epic, report and stop.

Display:
- **Epic:** $ARGUMENTS — <summary>
- **Status:** <status>
- **Description:** <full description>

---

## Step 2: Find Child Stories

Try the parent-based query first (next-gen projects — GCWEBRD is a `simplified: true` project so this is the canonical form):
```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND parent = $ARGUMENTS ORDER BY created ASC",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter"]
)
```

Fallback to the classic Epic Link field:
```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND \"Epic Link\" = $ARGUMENTS ORDER BY created ASC",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter"]
)
```

If still no results, report "No child issues found for $ARGUMENTS" and stop.

Display the full story list before grooming anything:

```
📋 Epic: $ARGUMENTS — <summary>
<epic description, truncated to ~200 chars if long>

Child stories (<count> total):
  1. <KEY> — <summary> [<status>]
  2. <KEY> — <summary> [<status>]
  ...
```

---

## Step 3: Groom Stories in Parallel

Filter child stories to only those eligible for grooming:
- Status in **To Do**, **Grooming**, or **Requirements Feedback**, AND
- Does not already carry the `groomed` label

Stories already past grooming (Requirements Review, Dev Ready, In Progress, Code Review, Bug Fixing, Ready for QA, QA, Done) are skipped — note them in the Step 4 summary as "skipped — already past Grooming."

If no stories remain after filtering, report and stop.

Invoke `superpowers:dispatching-parallel-agents`. Dispatch one subagent per eligible story. Each subagent prompt must include:

1. The specific story key (e.g., `GCWEBRD-12`)
2. The Atlassian cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
3. The Atlassian MCP prefix: `mcp__claude_ai_Atlassian_Rovo__`
4. The epic description (verbatim from Step 1) — the subagent must use this to ensure the story's AC is consistent with the epic goal. Any story that appears to conflict with the epic must have the conflict flagged in its grooming Jira comment.
5. The complete grooming instructions (Steps 3–7 from `.claude/commands/groom.md`), verbatim
6. Jira base URL: `https://radicaldesign.atlassian.net/browse/`
7. Project key: `GCWEBRD`

Wait for all subagents to complete. Collect each result (story key, final status, error if any) for the summary.

---

## Step 4: Summary

```
✅ Epic grooming complete

Epic: $ARGUMENTS — <summary>
Processed <N> stories:

[For each story:]
**<KEY>** — <summary>
- Status: → Requirements Review (or "Marked groomed" / Blocked)
- Jira: https://radicaldesign.atlassian.net/browse/<KEY>
```

---

## Notes

- The epic description is the source of truth for the feature's intent — use it to resolve ambiguity in individual stories
- Stories already past Grooming should be skipped (note them in the summary)
- Stories in Requirements Feedback are eligible for re-grooming
