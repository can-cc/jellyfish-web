// @flow
import React, { Component } from 'react';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
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

  onToggleShowDoneTodo = () => {
    this.setState({ showDone: !this.state.showDone });
  };

  render() {
    const undonedTodos = this.props.todos.filter(todo => !todo.done);
    const donedTodos = this.props.todos.filter(todo => todo.done);
    return (
      <div>
        <TodoCollection todos={undonedTodos} onTodoChange={this.props.onTodoChange} />
        <div style={{ cursor: 'pointer' }} onClick={this.onToggleShowDoneTodo}>
          <Icon style={{ fontSize: 20 }} type="tags-o" />
          显示已完成
        </div>
        {this.state.showDone && (
          <TodoCollection todos={donedTodos} onTodoChange={this.props.onTodoChange} />
        )}
      </div>
    );
  }
}
