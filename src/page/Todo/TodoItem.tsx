import React, { Component } from 'react';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import moment from 'moment';
import { Checkbox } from '../../component/Checkbox';
import { Todo } from '../../type/todo';

import './TodoItem.css';
import { AppAction } from '../../action';

export class TodoItem extends Component<
  {
    todo: Todo;
    selected: boolean;
  },
  any
> {
  onDoneChanged(checked: boolean) {
    AppAction.updateTodo({
      ...this.props.todo,
      status: checked ? 'Done' : 'Doing'
    });
  }

  onTodoClick = () => {
    AppAction.selectTodo(this.props.todo.id);
  };

  render() {
    const todo = this.props.todo;
    return (
      <List.Item className={`todo-item${this.props.selected ? ' selected' : ''}`} key={todo.id}>
        <Checkbox
          defaultChecked={todo.status === 'Done'}
          onChange={(checked: boolean) => this.onDoneChanged(checked)}
        />

        <div className="todo-item--content" onClick={this.onTodoClick}>
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
