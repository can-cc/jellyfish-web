import React, { Component } from 'react';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import moment from 'moment';
import { Checkbox } from '../../component/Checkbox';
import { Todo } from '../../model/todo';

import './TodoItem.css';
import { AppAction } from '../../action';

export class TodoItem extends Component<{
  todo: Todo
}, any> {

  onDoneChanged(checked: boolean) {
    AppAction.updateTodo({
      ...this.props.todo,
      done: checked
    });
  }

  render() {
    const todo = this.props.todo;
    return (
      <List.Item
        className="todo-item"
        style={{ height: '60px', fontSize: '18px', lineHeight: '50px' }}
        key={todo.id}
      >
        <Checkbox
          defaultChecked={todo.done}
          onChange={(checked: boolean) =>
            this.onDoneChanged(checked)
          }
        />

        <div className="todo-item--content">
          <div>{todo.content}</div>

          {todo.deadline && (
            <Tag color="#f50" style={{ marginLeft: '10px' }}>
              {moment(todo.deadline).format('YYYY-MM-DD')}
            </Tag>
          )}
        </div>
      </List.Item>
    );
  }
}
