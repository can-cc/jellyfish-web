// @flow
import React, { Component } from 'react';
import message from 'antd/lib/message';
import List from 'antd/lib/list';
import Checkbox from 'antd/lib/checkbox';

export class TodoItem extends Component<{ todo: any, onChange: any }> {
  render() {
    const todo = this.props.todo;
    return (
      <List.Item style={{ height: '40px' }} key={todo.id}>
        <Checkbox
          checked={todo.done}
          onChange={(event: SyntheticEvent<HTMLInputElement>) =>
            this.props.onChange({
              id: todo.id,
              done: event.target.checked
            })
          }
        />
        {todo.content}
      </List.Item>
    );
  }
}
