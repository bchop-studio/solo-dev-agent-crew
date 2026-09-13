# Plan: Todo State Module

## Goal

Add a dependency-free todo state module with tested add, complete, and delete behavior.

## Current state

The example folder contains handoff documents but no runnable source or tests.

## Tasks

1. Create `src/todos.mjs` with `createTodoState`, `addTodo`, `toggleTodo`, and `deleteTodo` exports.
   Acceptance: each operation returns the expected state without changing the input array.
2. Create `tests/todos.test.mjs` with one test for each behavior and an empty-input check.
   Acceptance: the tests fail before the source exists and pass after implementation.
3. Update the example handoff files with the commands and results from the real run.
   Acceptance: every PASS claim points to included source and test evidence.

## Constraints

- Use Node's built-in test runner.
- Add no runtime or development dependencies.
- Keep the example independent from a browser or framework.
- Do not commit, push, open a pull request, merge, or deploy without approval.

## Risks

- Blank todo text could create unusable entries, so reject it.
- State mutation could make UI updates unpredictable, so return new arrays and objects.

## Verification

```bash
node --test examples/todo-list/tests/todos.test.mjs
```

## Success criteria

The command exits with code 0 and reports four passing tests covering add, blank input, toggle, and delete.
