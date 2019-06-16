import React, { Component } from 'react';
import List from 'antd/lib/list';
import { TodoItem } from './TodoItem';
import { Todo } from '../../model/todo';

import './TodoList.css';

class TodoCollection extends Component<{
  todos: Todo[];
}> {
  render() {
    return (
      <List
        size="default"
        header={null}
        footer={null}
        dataSource={this.props.todos}
        renderItem={(todo: Todo) => <TodoItem todo={todo} />}
      />
    );
  }
}

export class TodoList extends Component<
  {
    todos: Todo[];
  },
  {}
> {
  render() {
    return (
      <div className="todo-list-container">
        <TodoCollection todos={this.props.todos} />
      </div>
    );
  }
}
