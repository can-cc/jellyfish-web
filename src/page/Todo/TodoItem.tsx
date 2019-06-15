import React, { Component } from 'react';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import moment from 'moment';

import { Checkbox } from '../../component/Checkbox';

import './TodoItem.css';


export class TodoItem extends Component<any, any> {
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
            this.props.onDoneChange({
              ...todo,
              done: checked
            })
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
