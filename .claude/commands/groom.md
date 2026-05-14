# Groom Jira Tickets

Refine requirements for GCWEBRD tickets in *Grooming* status (or the *To Do* fallback if the workflow isn't yet upgraded). Posts structured comments to Jira with assumptions, questions, and proposed acceptance criteria — then updates the ticket and transitions it to *Requirements Review* (or back to *To Do* with a `groomed` label as fallback).

The ticket(s) to groom: $ARGUMENTS

If $ARGUMENTS is empty, query all eligible tickets. If a ticket key is provided (e.g. `GCWEBRD-58`), process only that ticket.

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`

## Workflow transitions (with fallback)

| Intent | Preferred transition | Fallback |
|---|---|---|
| Grooming → Requirements Review | Finalize Requirements Draft | In Progress (id 21) — and tag with label `groomed` |
| Requirements Feedback → Requirements Review | Complete Requirements Feedback | In Progress (id 21) |
| Block | Block / Blocked | leave status, add label `blocked` and comment |

---

## Step 1: Resolve the Ticket List

```
mcp__claude_ai_Atlassian_Rovo__getAccessibleAtlassianResources()
```

If $ARGUMENTS is empty, query the grooming queue. Try in order; use the first that returns results:

```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND status in (Grooming, \"Requirements Feedback\") ORDER BY created ASC"
)
```

Fallback (basic workflow only — pull untriaged tickets that don't have a `groomed` label):
```
searchJiraIssuesUsingJql(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  jql="project = GCWEBRD AND status = \"To Do\" AND (labels is EMPTY OR labels not in (groomed, blocked)) ORDER BY created ASC"
)
```

If $ARGUMENTS is a ticket key, fetch that single ticket.

If no tickets are found, report "No tickets to groom" and stop.

---

## Step 2: Process Tickets

**Single ticket:** Proceed to Steps 3–7 in this session.

**Multiple tickets:** Invoke `superpowers:dispatching-parallel-agents`. Dispatch one subagent per ticket. Each subagent prompt must include:
- The specific ticket key
- The Atlassian cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- The Atlassian MCP prefix: `mcp__claude_ai_Atlassian_Rovo__`
- The complete instructions from Steps 3–7 below, verbatim
- Jira base URL: `https://radicaldesign.atlassian.net/browse/`
- Project key: `GCWEBRD`

Wait for all subagents to complete. Collect each result for the Step 8 Summary.

---

## Step 3: Fetch Ticket Details and Comment History

```
getJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields=["summary", "description", "issuetype", "status", "assignee", "reporter", "comment", "labels"]
)
```

Display:
- **Summary**
- **Description** (full text)
- **Existing Comments** (count and any prior grooming comments)

**Detect re-groom:** if status is *Requirements Feedback*, or comments contain "Grooming Agent" / "Assumptions Made" / "Acceptance Criteria", treat this as a revision. Read those comments AND any subsequent human comments — address the specific feedback rather than starting fresh.

---

## Step 4: Analyze the Ticket

Based on the description and any prior feedback:

1. Are requirements clear and actionable?
2. Is there missing context (who, what, why, edge cases)?
3. Are acceptance criteria present and testable?
4. What assumptions can be reasonably made vs. what truly needs human input?
5. If re-groom: what specific feedback was given? Have prior questions been answered?

**If too vague to make any reasonable assumptions** (empty description, single-word summary): skip to Step 7 and mark BLOCKED instead.

### Step 4a: Pull Figma design context (if a Figma URL is present)

Scan the ticket description and comments for any URL matching `figma.com/(design|file|board|deck|slides)/...`. For each one:

1. **Parse the URL** — extract `fileKey` (path segment after `/design/`, `/file/`, etc.) and `nodeId` from the `?node-id=…` query param. Convert dashes to colons in the node id (e.g. `51-3443` → `51:3443`).
2. **Invoke the figma-implement-design skill** to load the right Figma guidance. (`Skill` tool, name `figma:figma-implement-design`.)
3. **Fetch the design context** so the AC reflects what the design actually shows:
   ```
   mcp__plugin_figma_figma__get_metadata(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_design_context(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_screenshot(fileKey="<fileKey>", nodeId="<nodeId>")
   mcp__plugin_figma_figma__get_variable_defs(fileKey="<fileKey>", nodeId="<nodeId>")
   ```
4. **Use the design context** to refine the analysis:
   - Concrete UI elements visible in the design → explicit AC items ("renders the X badge in the top-right of each card")
   - Variants / states shown in the frame → AC for each variant ("hover", "active", "disabled")
   - Design tokens / variables (colors, spacing, type scales) → reference the token names rather than raw values, and add an AC item that the implementation must use the corresponding `tailwind.config.js` token rather than a hardcoded hex
   - Responsive frames (mobile/tablet/desktop) → AC items for each breakpoint
   - Text content visible in the design → captured verbatim in AC where copy matters
5. **Cite the Figma reference in the comment** posted in Step 5 — include the URL and the node id so the dev can open it in one click. If the design contradicts something already in the ticket description, flag the conflict explicitly as a question in Step 5 rather than silently choosing a side.

If the Figma fetch fails (link is private, node id is invalid, or the MCP returns an error), note that in the grooming comment ("Could not load Figma node X — please verify the link") and continue grooming from the text description alone.

---

## Step 5: Draft the Grooming Comment

Compose a structured Jira comment (markdown):

```
🤖 Grooming Agent — Requirements Refinement

[If re-groom, start with:]
📋 Addressing Prior Feedback
[Summarize what feedback was given and how this revision addresses it]

---

📌 Assumptions Made
- Assumed X because Y
- Defaulted to Z since no alternative was specified

---

❓ Clarifying Questions (Non-Blocking)
1. [Question about edge case or design decision]
2. [Question about scope or behavior]

---

✅ Proposed Acceptance Criteria
- [ ] Given [context], when [action], then [expected result]
- [ ] Given [context], when [action], then [expected result]
- [ ] Edge case: [description]
- [ ] Error state: [what happens when X fails]
```

Post it:
```
addCommentToJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  contentFormat="markdown",
  commentBody="<comment text>"
)
```

---

## Step 6: Update the Ticket Description

Rewrite the ticket description as ADF with this structure:
1. **User Story** — As a [user], I want [feature] so that [benefit]
2. **Requirements** — Refined, actionable requirements
3. **Acceptance Criteria** — The same checklist posted in the comment, formatted as a bullet/task list

```
editJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields={ "description": { "type": "doc", "version": 1, "content": [ ... ] } }
)
```

---

## Step 7: Reassign and Transition

Re-assign to the reporter:
```
editJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields={ "assignee": { "accountId": "<reporter-account-id>" } }
)
```

Transition (with fallback):
```
getTransitionsForJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>")
```

- **Has enough context to proceed:**
  - If from *Grooming*: try *Finalize Requirements Draft*; else fallback *In Progress* (21) and add label `groomed`
  - If from *Requirements Feedback*: try *Complete Requirements Feedback*; else fallback *In Progress* (21) and add label `groomed`
  - Basic-workflow ticket starting in *To Do*: leave status as is, add label `groomed`

- **Too vague to proceed:**
  - Try transition *Block / Blocked*; else add label `blocked` and post a comment explaining what's missing

```
transitionJiraIssue(cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0", issueIdOrKey="<ticket-key>", transitionId="...")
```

To add a label without a real status transition:
```
editJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  issueIdOrKey="<ticket-key>",
  fields={ "labels": [..existing.., "groomed"] }
)
```

---

## Step 8: Summary

```
✅ Grooming complete

Processed X ticket(s):

[For each ticket:]
**<TICKET-KEY>** — <Summary>
- Status: → Requirements Review (or "Marked groomed" / Blocked)
- Assumptions: <count>
- Questions: <count>
- AC: <count> criteria written
- Jira: https://radicaldesign.atlassian.net/browse/<TICKET-KEY>
```

---

## Notes

- Never ask clarifying questions interactively — all questions go into the Jira comment
- Make reasonable assumptions rather than blocking; document every assumption
- If multiple tickets are being processed, note progress as you go
- Project key: `GCWEBRD` | Cloud ID: `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
