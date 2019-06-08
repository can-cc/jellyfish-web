import React, { Component } from 'react';
import List from 'antd/lib/list';
import { TodoItem } from './TodoItem';

class TodoCollection extends Component<any, any> {
  render() {
    return (
      <List
        size="default"
        header={null}
        footer={null}
        dataSource={this.props.todos}
        renderItem={todo => <TodoItem todo={todo} onDoneChange={this.props.onTodoDoneChange} />}
      />
    );
  }
}

export class TodoList extends Component<any, any> {
  state = {
    showDone: false
  };

  onToggleShowDoneTodo = () => {
    this.setState({ showDone: !this.state.showDone });
  };

  render() {
    const undonedTodos = this.props.todos.filter(todo => !todo.done);
    return (
      <div>
        <TodoCollection todos={undonedTodos} onTodoDoneChange={this.props.onTodoDoneChange} />
      </div>
    );
  }
}
