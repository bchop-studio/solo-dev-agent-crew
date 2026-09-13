import test from "node:test";
import assert from "node:assert/strict";
import {
  addTodo,
  createTodoState,
  deleteTodo,
  toggleTodo,
} from "../src/todos.mjs";

test("adds a trimmed todo without changing the previous state", () => {
  const before = createTodoState();
  const after = addTodo(before, "  write tests  ", () => "todo-1");

  assert.deepEqual(before, []);
  assert.deepEqual(after, [
    { id: "todo-1", text: "write tests", completed: false },
  ]);
});

test("rejects an empty todo", () => {
  assert.throws(() => addTodo([], "   "), /Todo text is required/);
});

test("toggles only the matching todo", () => {
  const before = [
    { id: "todo-1", text: "write tests", completed: false },
    { id: "todo-2", text: "run tests", completed: false },
  ];

  assert.deepEqual(toggleTodo(before, "todo-2"), [
    before[0],
    { ...before[1], completed: true },
  ]);
});

test("deletes only the matching todo", () => {
  const before = [
    { id: "todo-1", text: "write tests", completed: false },
    { id: "todo-2", text: "run tests", completed: false },
  ];

  assert.deepEqual(deleteTodo(before, "todo-1"), [before[1]]);
});
