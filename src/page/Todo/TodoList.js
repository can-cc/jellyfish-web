// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import DatePicker from 'antd/lib/date-picker';
import List from 'antd/lib/list';

export class TodoList extends Component<{}, { todos: [] }> {
  state = {
    todos: []
  };

  componentWillMount() {
    this.getTodos();
  }

  async getTodos() {
    const userId = window.localStorage.getItem('userId');
    const resp = await axios.get(`/api/todos?userId=${userId}`);
    this.setState({ todos: resp.data });
  }

  render() {
    return (
      <div>
        <List
          size="large"
          header={<div>Header</div>}
          footer={<div>Footer</div>}
          bordered
          dataSource={this.state.todos}
          renderItem={item => <List.Item>{item}</List.Item>}
        />
      </div>
    );
  }
}
