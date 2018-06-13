// @flow
import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import { TodoCreater } from './TodoCreater';
import { TodoList } from './TodoList';
import { Subject } from 'rxjs';
import findIndex from 'ramda/src/findIndex';
import update from 'ramda/src/update';
import propEq from 'ramda/src/propEq';
import { inject, observer } from 'mobx-react';

import './TodoPage.css';

@inject('todoStore')
@withRouter
@observer
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

  onTodoChange = (changedTodo: any) => {
    const oldTodoIndex = findIndex(propEq('id', changedTodo.id), this.state.todos);
    if (oldTodoIndex <= -1) {
      return;
    }
    this.setState({
      todos: update(
        oldTodoIndex,
        {
          ...this.state.todos[oldTodoIndex],
          ...changedTodo
        },
        this.state.todos
      )
    });
  };

  render() {
    return (
      <div
        style={{
          padding: '40px 20px'
        }}
      >
        <TodoCreater
          style={{
            marginBottom: '30px'
          }}
          add$={this.add$}
        />
        <TodoList todos={this.state.todos} onTodoChange={this.onTodoChange} />
      </div>
    );
  }
}
