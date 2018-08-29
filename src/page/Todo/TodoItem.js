// @flow
import React, { Component } from 'react';
import message from 'antd/lib/message';
import List from 'antd/lib/list';
import Checkbox from 'antd/lib/checkbox';

import './TodoItem.css';

export class TodoItem extends Component<{ todo: any, onChange: any }> {
  render() {
    const todo = this.props.todo;
    return (
      <List.Item
        className="todo-item"
        style={{ height: '60px', fontSize: '26px', lineHeight: '50px' }}
        key={todo.id}
      >
        <Checkbox
          style={{ fontSize: 40, marginRight: 30 }}
          checked={todo.done}
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            this.props.onChange({
              ...todo,
              done: event.target.checked
            })
          }
        />
        <div>{todo.content}</div>
      </List.Item>
    );
  }
}
