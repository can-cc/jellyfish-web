// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import { TodoCreater } from './TodoCreater';
import { TodoList } from './TodoList';
import { Subject } from 'rxjs';

export class TodoPage extends Component<{}, { todos: [] }> {
  state = {
    todos: []
  };
  add$: Subject<void> = new Subject();

  componentWillMount() {
    this.getTodos();

    this.add$.subscribe(() => {
      this.getTodos();
    });
  }

  componentWillUnmount() {
    this.add$.complete();
  }

  async getTodos() {
    const userId = window.localStorage.getItem('userId');
    const resp = await axios.get(`/api/auth/todo?userId=${userId}`);
    this.setState({ todos: resp.data });
  }

  render() {
    return (
      <div>
        <TodoCreater add$={this.add$} />
        <TodoList todos={this.state.todos} />
      </div>
    );
  }
}
