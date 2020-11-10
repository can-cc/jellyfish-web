import React from 'react';
import { distinctUntilChanged } from 'rxjs/operators';
import { useStore } from '../../../hook/useStore';
import { TodoList } from '../TodoList';

export function TodoListContainer({ todos }) {
  const selectedTodoId = useStore((appStore) =>
    appStore.selectedTodoId$.pipe(distinctUntilChanged())
  );
  const selectedBoxId = useStore((appStore) =>
    appStore.selectedBoxId$.pipe(distinctUntilChanged())
  );

  return (
    <div>
      <TodoList boxId={selectedBoxId} todos={todos} selectedTodoId={selectedTodoId} />
    </div>
  );
}
