//      
import React, { Component } from 'react';
import List from 'antd/lib/list';
import Icon from 'antd/lib/icon';
import { TodoItem } from './TodoItem';

class TodoCollection extends Component                                              {
  render() {
    return (
      <List
        size="large"
        header={null}
        footer={null}
        dataSource={this.props.todos}
        renderItem={todo => <TodoItem todo={todo} onDoneChange={this.props.onTodoDoneChange} />}
      />
    );
  }
}

export class TodoList extends Component 
                                          
   
                     
   
  {
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
        <TodoCollection todos={undonedTodos} onTodoDoneChange={this.props.onTodoDoneChange} />
        <div style={{ marginLeft: -10, cursor: 'pointer' }} onClick={this.onToggleShowDoneTodo}>
          <Icon style={{ fontSize: 22, verticalAlign: 'middle' }} type="tags-o" />
          显示已完成
        </div>
        {this.state.showDone && (
          <TodoCollection todos={donedTodos} onTodoDoneChange={this.props.onTodoDoneChange} />
        )}
      </div>
    );
  }
}
