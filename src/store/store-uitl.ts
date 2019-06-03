export function addTodo(todo: any) {
  return (todoMap: any) => {
    return {
      ...todoMap,
      [todo.id]: todo
    };
  };
}

export function updateTodo(todo: any) {
  return (todoMap: any) => {
    return {
      ...todoMap,
      [todo.id]: {
        ...(todoMap[todo.id] || {}),
        ...todo
      }
    };
  };
}

export function updateCycleTodo(todo: any) {
  return (todoMap: any) => {
    return {
      ...todoMap,
      [todo.id]: {
        ...(todoMap[todo.id] || {}),
        ...todo
      }
    };
  };
}
