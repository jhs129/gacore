# Solution Review

Audit this Next.js 14 Pages Router / Builder.io / Apollo GraphQL application against best practices. For every gap found, explain the **why** behind the best practice. Then interactively decide which gaps to log as Jira bugs in GCWEBRD.

---

## Project constants

- **Atlassian cloud ID:** `e7c99895-a948-4f7a-ae80-284f8ead1eb0`
- **Atlassian MCP prefix:** `mcp__claude_ai_Atlassian_Rovo__`
- **Jira project key:** `GCWEBRD`
- **Jira base URL:** `https://radicaldesign.atlassian.net/browse/`

---

## Evaluation Dimensions

| # | Dimension | What's Checked |
|---|-----------|----------------|
| 1 | **Performance & Image Optimization** | `next/image` usage, LCP candidates, image sizing, Cloudinary integration |
| 2 | **Component Architecture** | File size, splitting conventions, top-level `components/` grouping |
| 3 | **Builder.io Integration** | Registration completeness in `builder-registry.js`, `mappings/` coverage, default images |
| 4 | **Tailwind & Theming** | Token usage, hardcoded colors, theme-aware classes |
| 5 | **Data Fetching Patterns** | `getStaticProps` with ISR, `getServerSideProps` appropriateness, `notFound()`, GraphQL query placement |
| 6 | **Type Safety** | `any` usage, interface definitions, missing types |
| 7 | **Code Quality & Polish** | Lint cleanliness, console.log statements, unused imports, a11y |

---

## Step 1: Dispatch Parallel Audit Subagents

Invoke `superpowers:dispatching-parallel-agents` with 7 subagents — one per dimension. Each subagent runs its assigned bash commands, reads relevant files, and returns a structured result object.

**Required result format for every subagent:**
```json
{
  "dimension": "<number> — <name>",
  "rating": "✅ Pass | ⚠️ Gap | ❌ Missing",
  "summary": "one-line description of the finding",
  "issues": [
    {
      "title": "short plain-English title",
      "files": ["path/to/file.tsx"],
      "problem": "one sentence: what is wrong",
      "fix": "one sentence: what the best-practice fix is"
    }
  ],
  "teachingNote": "the 'What to teach' text from the dimension instructions below"
}
```

---

### Subagent 1 — Performance & Image Optimization

Run:
```bash
grep -rn "<img " components/ pages/ --include="*.tsx" --include="*.jsx"
grep -rn "next/image\|next-cloudinary" components/ pages/ --include="*.tsx" --include="*.jsx"
```

Look for: Are `<img>` tags used instead of `next/image` or `next-cloudinary`? Are images missing `width`/`height` props? Are large hero images missing `priority`? Are Cloudinary assets going through `next-cloudinary` (the project depends on it)?

Teaching note: *`next/image` and `next-cloudinary` automatically optimize images: lazy loading, modern formats (WebP/AVIF), and correct sizing prevent LCP regressions. Hero images above the fold need `priority` to avoid lazy-loading the LCP element. Raw `<img>` tags will generate Next.js warnings and hurt Core Web Vitals.*

---

### Subagent 2 — Component Architecture

Run:
```bash
find components -name "*.tsx" -o -name "*.jsx" | xargs wc -l | sort -rn | head -20
find components -name "index.tsx" -o -name "index.jsx" | head -20
ls components/
```

Also read the CLAUDE.md rule: "If a component needs sub components and helper methods and is more than 100 lines of code, please split it into multiple files in a directory of the component name."

Look for: Any component files over 100 lines that haven't been split? Do split components follow the `components/[Name]/index.tsx` pattern? Are Props interfaces defined simply (no `Omit`/`NonNullable`)? Components missing a Storybook story?

Teaching note: *Splitting large components into a directory with `index.tsx` keeps each file focused and testable. Co-locating sub-components and helpers in the same directory makes the relationship explicit. Simple interface definitions are easier to read and less fragile to refactor.*

---

### Subagent 3 — Builder.io Integration

Run:
```bash
cat builder-registry.js
ls mappings/
grep -rn "Builder.registerComponent\|withChildren" mappings/ builder-registry.js
grep -rn "placehold.co" mappings/ builder-registry.js
```

Look for: Is every component in `components/` either registered directly in `builder-registry.js` or wrapped via a mapper in `mappings/`? Do mapper files follow the `<Name>.mapper.tsx` convention? Do default image props use `placehold.co` with `.png` extension? Are Builder.io component menus organized logically (insertMenu)?

Teaching note: *Builder.io registration connects components to the visual editor. Missing registrations mean content editors can't use the component. Mappers in `mappings/` bridge presentational components and Builder.io's editor model. Default `placehold.co` images must use `.png` extension to avoid format issues. The `insertMenu` groups components logically so editors can find them.*

---

### Subagent 4 — Tailwind & Theming

Run:
```bash
grep -rn "#[0-9a-fA-F]\{3,6\}\|rgb(\|rgba(" components/ pages/ --include="*.tsx" --include="*.jsx" --include="*.css" | grep -v "globals.css\|themes/"
grep -rn "bg-\[#\|text-\[#\|border-\[#" components/ pages/ --include="*.tsx" --include="*.jsx"
```

Look for: Are hardcoded hex/rgb colors used in components instead of Tailwind tokens? Are arbitrary Tailwind values (`bg-[#xxx]`) used where a configured token exists? Are all custom colors referenced from `tailwind.config.js`?

Teaching note: *Hardcoded colors break theming — if a brand color changes, every hardcoded instance must be hunted down. Tailwind tokens defined in `tailwind.config.js` give a single source of truth.*

---

### Subagent 5 — Data Fetching Patterns

Run:
```bash
grep -rn "getStaticProps\|getServerSideProps\|revalidate\|notFound" pages/ --include="*.tsx" --include="*.jsx" --include="*.ts"
grep -rn "Promise.all\|useQuery\|gql\`" pages/ components/ app/ --include="*.tsx" --include="*.jsx" --include="*.ts"
```

Also read each `pages/*.tsx` and `pages/*.jsx` to check fetch patterns. Read `app/graphql/` to understand the GraphQL endpoint shape.

Look for: Do pages that can be statically generated use `getStaticProps` with `revalidate`? Is `notFound()` returned when a fetch returns no content? Is `Promise.all` used when multiple independent fetches happen in the same function? Are `getServerSideProps` pages justified or should they be ISR? Are GraphQL queries co-located near where the data is consumed?

Teaching note: *`getStaticProps` with `revalidate` (ISR) gives the best of both worlds: static performance on first load, automatic background refresh. `notFound()` returns a proper 404 — without it, empty pages silently return 200 which is bad for SEO. `Promise.all` for parallel fetches reduces total wait from the sum of each fetch to the slowest one.*

---

### Subagent 6 — Type Safety

Run:
```bash
grep -rn "\bany\b" components/ pages/ app/ --include="*.tsx" --include="*.ts" | grep -v "//.*any\|eslint-disable" | head -20
grep -rn "Omit\|NonNullable\|Parameters\|ReturnType" types/ components/ --include="*.ts" --include="*.tsx"
```

Look for: Are `any` types used? Are interfaces defined using complex utility types (`Omit`, `NonNullable`)? Are function parameters and return types typed? Are Builder.io and GraphQL response types properly typed?

Teaching note: *`any` disables TypeScript's purpose — every `any` is a place where bugs will hide. The CLAUDE.md convention requires simple interface definitions without `Omit` and `NonNullable` to keep types readable and less fragile.*

---

### Subagent 7 — Code Quality & Polish

Run:
```bash
pnpm lint 2>&1 | head -60
grep -rn "console\.log\|console\.warn" components/ pages/ app/ --include="*.tsx" --include="*.ts" --include="*.jsx"
grep -rn "TODO\|FIXME\|HACK" components/ pages/ app/ --include="*.tsx" --include="*.ts" --include="*.jsx"
```

Look for: Does `pnpm lint` pass clean? Stale `console.log` statements? Unresolved TODOs/FIXMEs? Components missing accessibility attributes (`aria-label`, `alt` on images, button labels)?

Teaching note: *A clean lint pass is the baseline. `console.log` left in production pollutes browser consoles and may leak data. TODOs that survive into main are deferred debt — convert to Jira tickets if they matter, or remove. Accessibility is non-negotiable.*

---

After all 7 subagents complete, collect their result objects and proceed to Step 2.

## Step 2: Compile and Present Results

Present:

1. **A summary table** rating each dimension ✅ Pass / ⚠️ Gap / ❌ Missing
2. **A numbered issue list** — every Gap and Missing item, with:
   - The dimension it belongs to
   - A plain-English title
   - One sentence describing what's wrong
   - One sentence explaining the fix
   - The specific file(s) involved

```
## Audit Results

| # | Dimension | Rating | Summary |
|---|-----------|--------|---------|
| 1 | Performance & Image Optimization | ❌ | Raw img tags in 3 components |
| 2 | Component Architecture | ✅ | All components properly split |
...

## Issues Found

**Issue 1 — Performance: Raw img tag instead of next/image**
📁 `components/hero/Hero.tsx`
Using a raw img element instead of next/image causes slower LCP and higher bandwidth.
Replace with the Image component from next/image with explicit width and height props.
```

---

## Step 3: Sequential Jira Triage

Go through the issue list one at a time. For each issue:

1. Restate the problem briefly and why it matters
2. Ask: `Log this as a Jira bug? (yes / no / skip-rest)`
3. Wait for the user's response

Valid responses:
- **yes** → log it, move on
- **no** → skip it, move on
- **skip-rest** → stop asking, go to final summary

---

## Step 4: Log Approved Issues as Jira Bugs

For each approved issue:

```
mcp__claude_ai_Atlassian_Rovo__createJiraIssue(
  cloudId="e7c99895-a948-4f7a-ae80-284f8ead1eb0",
  projectKey="GCWEBRD",
  issuetype="Bug",
  summary="[Dimension] <Title>",
  description=<ADF doc with Current State, Expected, and Why It Matters sections>,
  priority="Medium"
)
```

Confirm each: `✅ Logged GCWEBRD-<key>: <summary>`

---

## Step 5: Final Summary

```
## Review Complete

Dimensions passing: X/7

### Logged as Jira Issues
- GCWEBRD-XX — <summary>

### Not logged
- Issue #N — <title> (skipped)
```

---

## Notes

- Jira: project `GCWEBRD`, cloud ID `e7c99895-a948-4f7a-ae80-284f8ead1eb0`, base URL `https://radicaldesign.atlassian.net/browse/`
- Always cite specific file paths so issues are immediately actionable
- Top-level directories: `components/`, `pages/`, `mappings/`, `app/` (GraphQL only), `styles/`, `types/`
