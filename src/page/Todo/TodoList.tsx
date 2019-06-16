import React, { Component } from 'react';
import List from 'antd/lib/list';
import { TodoItem } from './TodoItem';

import './TodoList.css';
import { Todo } from '../../model/todo';

class TodoCollection extends Component<any, any> {
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
    const undonedTodos = this.props.todos.filter(todo => !todo.done);
    return (
      <div className="todo-list-container">
        <TodoCollection todos={undonedTodos} />
      </div>
    );
  }
}
