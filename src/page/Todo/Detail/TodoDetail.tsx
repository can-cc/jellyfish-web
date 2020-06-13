import React from 'react';
import { map } from 'rxjs/operators';
import { Checkbox } from '../../../component/Checkbox';
import { AppAction } from '../../../store/action';
import { DetailField } from './DetailField/DetailField';
import { faBell, faSun } from '@fortawesome/free-regular-svg-icons';
import { faListOl, faReply } from '@fortawesome/free-solid-svg-icons';
import { DetailFooter } from './DetailFooter/DetailFooter';
import { useStore } from '../../../hook/useStore';
import './TodoDetail.css';
import { Select } from '../../../component/Select';
import { Todo } from '../../../type/todo';

interface InputProps {
  todoId: string;
  onClose: () => void;
}

export function TodoDetail({ todoId, onClose }: InputProps) {
  const onTodoChange = (todo: Todo, refreshList: boolean = false) => {
    AppAction.updateTodo(todo).then(() => {
      if (refreshList) {
        AppAction.getTodos();
      }
    });
  };
  const todo = useStore(appStore =>
    appStore.todos$.pipe(
      map(todos => {
        return todos.get(todoId);
      })
    )
  );

  const boxOptions = (useStore(appStore => appStore.boxes$) || []).map(box => ({
    value: box.id,
    label: box.name
  }));

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
        <DetailField icon={faReply} name="repeat" placeholder="重复" />
        <DetailField icon={faListOl} name="box" placeholder="清单">
          <Select
            style={{
              marginLeft: -3
            }}
            placeholder="清单"
            value={todo.boxId || ''}
            options={boxOptions}
            onChange={value => onTodoChange({ ...todo, boxId: value }, true)}
          />
        </DetailField>

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

      <DetailFooter todo={todo} />
    </div>
  );
}
