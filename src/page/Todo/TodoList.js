// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import DatePicker from 'antd/lib/date-picker';
import List from 'antd/lib/list';

export class TodoList extends Component<{ todos: [] }> {
  render() {
    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.props.todos}
          renderItem={todo => <List.Item key={todo.id}>{todo.content}</List.Item>}
        />
      </div>
    );
  }
}
