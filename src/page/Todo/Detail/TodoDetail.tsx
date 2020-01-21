import React, { useState, useEffect } from 'react';
import { AppStoreContext } from '../../../context/store-context';
import { AppStore } from '../../../store/store';
import { take } from 'rxjs/operators';
import { Checkbox } from '../../../component/Checkbox';
import { AppAction } from '../../../action';
import { DetailField } from './DetailField/DetailField';
import { faBell, faSun } from '@fortawesome/free-regular-svg-icons';
import './TodoDetail.css';
import { Todo } from '../../../model/todo';

interface InputProps {
  todoID: string;
}

export function TodoDetail({ todoID }: InputProps) {
  const [todo, setTodo] = useState(null);
  const [detail, setDetail] = useState(undefined);

  const onTodoChange = todo => {
    AppAction.updateTodo(todo);
  };
  var appStore: AppStore

  useEffect(() => {
    appStore.todos$.pipe(take(1)).subscribe((todos: Todo[]) => {
      const todo = todos.find(t => t.id === todoID);
      if (!todo) {
        return
      }
      setTodo(todo);
      setDetail(todo.detail || '')
    });
  }, [todoID])

  return (
    
    <AppStoreContext.Consumer>
      {(a: AppStore) => {
        if (!appStore){
          appStore = a
        }
        if (!todo) {
          return null;
        }
        return (
          <div className="TodoDetail">
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

              <div className="comment-field">
                <textarea
                  name="comment"
                  value={detail}
                  rows={3}
                  placeholder="添加备注"
                  onBlur={() => onTodoChange({...todo, detail})}
                  onChange={e => setDetail(e.target.value)}
                ></textarea>
              </div>
            </div>
          </div>
        );
      }}
    </AppStoreContext.Consumer>
  );
}
