# Solo Dev Agent Crew

**Plan it, build it, prove it.**

A copy-paste workflow for giving an AI coding tool three clear jobs: plan a small change, build it, and verify the result with real commands.

No agent framework is required. The safety checks live in the prompts.

---

## Choose the review strength

### Separate sessions, stronger review

Use [Planner](prompts/planner.md), [Builder](prompts/builder.md), and [Reviewer](prompts/reviewer.md) in three fresh sessions. The reviewer starts without the builder's reasoning and must inspect the actual diff and run the checks again.

### Same session, faster feedback

Use the [all-in-one prompt](prompts/all-in-one.md) when speed matters more than independence. It runs all three roles in the same session, so its final review is a verification pass, not an independent opinion.

Neither mode commits, pushes, opens a pull request, merges, or deploys without your approval.

---

## Quick start

Create a place for the handoff files:

```bash
mkdir -p crew
```

Copy the prompt for the mode you want, replace `[YOUR TASK HERE]`, and run it from your project folder.

Keep the task small and specific. A useful task names one behavior and says how you will know it works.

---

## What counts as verified

A `PASS` must be backed by evidence from the current files:

- the repository instructions and acceptance criteria were checked
- the git diff was inspected
- relevant tests, lint, type checks, and builds were run when available
- security-sensitive changes were checked for unsafe input handling and leaked secrets
- every command and result was recorded in `crew/review.md`

If a required check cannot run, the verdict is `NEEDS_FIX`, not `PASS`.

---

## What's included

| File | What it does |
|------|--------------|
| `prompts/planner.md` | Creates a bounded plan and names the checks |
| `prompts/builder.md` | Makes the change and records real command results |
| `prompts/reviewer.md` | Reviews the diff and reruns the checks |
| `prompts/all-in-one.md` | Runs the three roles in one guarded session |
| `examples/todo-list/` | Runnable todo-state example with tests and handoff files |

---

## Runnable example

The todo example includes its source, tests, plan, build log, and review.

```bash
node --test examples/todo-list/tests/todos.test.mjs
```

The test covers add, empty-input rejection, complete, and delete behavior.

---

## Safety boundary

These prompts are helpers, not permission slips. Review the proposed scope before giving a tool access to private data, credentials, production systems, or destructive commands.

See [SECURITY.md](SECURITY.md) for private vulnerability reporting.

---

MIT licensed.

Built by [@BChopLXXXII](https://x.com/BChopLXXXII).
