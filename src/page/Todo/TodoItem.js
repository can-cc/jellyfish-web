//      
import React, { Component } from 'react';
import message from 'antd/lib/message';
import List from 'antd/lib/list';
import Tag from 'antd/lib/tag';
import Checkbox from 'antd/lib/checkbox';
import moment from 'moment';

import './TodoItem.css';

export class TodoItem extends Component                                   {
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
          onChange={(event                                  ) =>
            this.props.onDoneChange({
              ...todo,
              done: event.target.checked
            })
          }
        />
        <div>{todo.content}</div>
        {todo.deadline && (
          <Tag color="#f50" style={{ marginLeft: '10px' }}>
            {moment(todo.deadline).format('YYYY-MM-DD')}
          </Tag>
        )}

        {todo.type === 'HABIT' && (
          <Tag color="#2db7f5" style={{ marginLeft: '10px' }}>
            习惯
          </Tag>
        )}
      </List.Item>
    );
  }
}
