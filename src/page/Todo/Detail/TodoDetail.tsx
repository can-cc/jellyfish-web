import React from 'react';
import { map } from 'rxjs/operators';
import { Checkbox } from '../../../component/Checkbox';
import { AppAction } from '../../../store/action';
import { DetailField } from './DetailField/DetailField';
import { faBell, faSun } from '@fortawesome/free-regular-svg-icons';
import { faRedoAlt } from '@fortawesome/free-solid-svg-icons';
import { DetailFooter } from './DetailFooter/DetailFooter';
import { useStore } from '../../../hook/useStore';
import './TodoDetail.css';

interface InputProps {
  todoId: string;
  onClose: () => void;
}

export function TodoDetail({ todoId, onClose }: InputProps) {
  const onTodoChange = todo => {
    AppAction.updateTodo(todo).then();
  };
  const todo = useStore(appStore =>
    appStore.todos$.pipe(
      map(todos => {
        return todos.get(todoId);
      })
    )
  );
  if (!todo) {
    return null;
  }

  return (
    <div
      className="TodoDetail"
      tabIndex={0}
      onKeyDown={event => {
        if (event.key === 'Escape') {
          onClose();
        }
      }}
    >
      <div className="TodoDetail-todo-content">
        <Checkbox
          defaultChecked={todo.status === 'Done'}
          onChange={(checked: boolean) =>
            onTodoChange({
              ...todo,
              status: checked ? 'Done' : 'Doing'
            })
          }
        />
        <div>{todo.content}</div>
      </div>

      <div className="TodoDetail--fields">
        <DetailField icon={faSun} name="myDay" placeholder="添加到我的一天" />
        <DetailField icon={faBell} name="notification" placeholder="提醒我" />
        <DetailField icon={faRedoAlt} name="repeat" placeholder="重复" />

        <div className="comment-field">
          <textarea
            name="comment"
            value={todo.detail || ''}
            rows={3}
            placeholder="添加备注"
            onBlur={e => onTodoChange({ ...todo, detail: e.target.value })}
            onChange={e => onTodoChange({ ...todo, detail: e.target.value })}
          />
        </div>
      </div>

      <DetailFooter time={todo.createdAt} />
    </div>
  );
}
