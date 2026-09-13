export function createTodoState() {
  return [];
}

export function addTodo(state, text, createId = () => crypto.randomUUID()) {
  const normalizedText = String(text).trim();
  if (!normalizedText) {
    throw new Error("Todo text is required");
  }

  return [
    ...state,
    {
      id: createId(),
      text: normalizedText,
      completed: false,
    },
  ];
}

export function toggleTodo(state, id) {
  return state.map((todo) =>
    todo.id === id ? { ...todo, completed: !todo.completed } : todo,
  );
}

export function deleteTodo(state, id) {
  return state.filter((todo) => todo.id !== id);
}
