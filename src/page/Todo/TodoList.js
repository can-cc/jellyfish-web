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

export class TodoList extends Component<
  { todos: any[], onTodoChange: any },
  {
    showDone: boolean
  }
> {
  state = {
    showDone: false
  };

  onToggleShowDone = () => {
    this.setState({ showDone: !this.state.showDone });
  };

  render() {
    const todos = this.props.todos.filter(todo => (this.state.showDone ? true : !todo.done));
    return (
      <div>
        <TodoCollection todos={todos} onTodoChange={this.props.onTodoChange} />
        <div onClick={this.onToggleShowDoneTodo}>显示已完成</div>
      </div>
    );
  }
}
