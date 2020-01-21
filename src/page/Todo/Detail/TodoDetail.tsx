import React, { useState } from 'react';
import { AppStoreContext } from '../../../context/store-context';
import { AppStore } from '../../../store/store';

import './TodoDetail.css';
import { take } from 'rxjs/operators';
import { Checkbox } from '../../../component/Checkbox';
import List from 'antd/lib/list';
import { AppAction } from '../../../action';
import { DetailField } from './DetailField/DetailField';
import { faBell, faSun } from '@fortawesome/free-regular-svg-icons';

interface InputProps {
  todoID: string;
}

export function TodoDetail({ todoID }: InputProps) {
  const [todo, setTodo] = useState(null);

  const onStatusChanged = todo => {
    AppAction.updateTodo(todo);
  };
  return (
    <AppStoreContext.Consumer>
      {(a: AppStore) => {
        console.log(todoID);
        a.todos$.pipe(take(1)).subscribe(todos => {
          const todo = todos.find(t => t.id === todoID);
          setTodo(todo);
        });

        if (!todo) {
          return null;
        }
        return (
          <div className="TodoDetail">
            <div className="TodoDetail-todo-content">
              <Checkbox
                defaultChecked={todo.status === 'Done'}
                onChange={(checked: boolean) =>
                  onStatusChanged({
                    ...todo,
                    status: checked ? 'Done' : 'Doing'
                  })
                }
              />
              <div>{todo.content}</div>
            </div>

            <div>
              <DetailField icon={faSun} name="myDay" placeholder="添加到我的一天" />
              <DetailField icon={faBell} name="notification" placeholder="提醒我" />
            </div>
          </div>
        );
      }}
    </AppStoreContext.Consumer>
  );
}
