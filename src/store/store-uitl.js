export function addTodo(todo) {
  return (todoMap) => {
    return {
      ...todoMap,
      [todo.id]: todo
    };
  };
}

export function updateTodo(todo) {
  return (todoMap) => {
    return {
      ...todoMap,
      [todo.id]: {
        ...(todoMap[todo.id] || {}),
        ...todo
      }
    };
  };
}

export function updateCycleTodo(todo) {
  return (todoMap) => {
    return {
      ...todoMap,
      [todo.id]: {
        ...(todoMap[todo.id] || {}),
        ...todo
      }
    };
  };
}
