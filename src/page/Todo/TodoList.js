// @flow
import React, { Component } from 'react';
import List from 'antd/lib/list';
import { TodoItem } from './TodoItem';

class TodoCollection extends Component<{ todos: any[], onTodoChange: any }, {}> {
  render() {
    return (
      <List
        size="large"
        header={null}
        footer={null}
        dataSource={this.props.todos}
        renderItem={todo => <TodoItem todo={todo} onChange={this.props.onTodoChange} />}
      />
    );
  }
}

export class TodoList extends Component<{ todos: any[], onTodoChange: any }> {
  render() {
    return (
      <div>
        <TodoCollection todos={this.props.todos} onTodoChange={this.props.onTodoChange} />
      </div>
    );
  }
}
