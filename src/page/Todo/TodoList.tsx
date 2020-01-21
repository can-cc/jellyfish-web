import React, { Component } from 'react';
import List from 'antd/lib/list';
import { TodoItem } from './TodoItem';
import { Todo } from '../../model/todo';

import './TodoList.css';

class TodoCollection extends Component<{
  todos: Todo[];
  selectedTodoID?: string;
}> {
  render() {
    return (
      <List
        size="default"
        header={null}
        footer={null}
        dataSource={this.props.todos}
        renderItem={(todo: Todo) => (
          <TodoItem todo={todo} selected={todo.id === this.props.selectedTodoID} />
        )}
      />
    );
  }
}

export class TodoList extends Component<
  {
    todos: Todo[];
    selectedTodoID?: string;
  },
  {}
> {
  render() {
    return (
      <div className="todo-list-container">
        <TodoCollection todos={this.props.todos} selectedTodoID={this.props.selectedTodoID} />
      </div>
    );
  }
}
