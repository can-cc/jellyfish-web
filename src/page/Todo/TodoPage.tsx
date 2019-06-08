import React, { Component } from 'react';
import axios from 'axios';
import { TodoList } from './TodoList';
import { TodoCreator } from './TodoCreator';
import { distinctUntilChanged, switchMap } from 'rxjs/operators';
import store from '../../store/store';
import { Todo } from '../../model/todo';
import { HeaderBar } from './HeaderBar';

import './TodoPage.css';

export class TodoPage extends Component<any, any> {
  state = { todos: [], avatar: '' };

  componentDidMount() {
    this.getTodos();

    store.todoMap$.subscribe(todoMap => {
      this.setState({ todos: Object.values(todoMap) });
    });

    store.todoUpdate$
      .pipe(
        distinctUntilChanged(),
        switchMap((todo: any) => axios.put(`/api/auth/todo/${todo.id}`, todo))
      )
      .subscribe();

    axios.get(`/api/auth/user/${window.localStorage.getItem('userId')}`).then(resp => {
      this.setState({ avatarUrl: resp.data.avatar, username: resp.data.username });
    });
  }

  componentWillUnmount() {}

  getTodos() {
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/auth/todo?userId=${userId}`).then(resp => {
      resp.data.forEach((todo: Todo) => {
        store.todoAdd$.next(todo);
      });
    });
  }

  onTodoDoneChange = (changedTodo: any) => {
    store.todoUpdate$.next(changedTodo);
  };

  onCreateTodo = () => {
    this.getTodos();
  };

  render() {
    const { todos } = this.state;
    return (
      <div
        style={{
          padding: '40px 100px',
          width: '50%',
          margin: 'auto auto'
        }}
      >
        <HeaderBar />

        <TodoCreator onCreate={this.onCreateTodo} />
        <TodoList todos={todos} onTodoDoneChange={this.onTodoDoneChange} />
      </div>
    );
  }
}
