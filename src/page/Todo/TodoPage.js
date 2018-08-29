// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { TodoCreater } from './TodoCreater';
import { TodoList } from './TodoList';
import { Subject } from 'rxjs';
import update from 'ramda/src/update';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import './TodoPage.css';

import store from '../../store/';

export class TodoPage extends Component<{}, { todos: any[] }> {
  add$: Subject<void> = new Subject();
  state = { todos: [] };

  componentDidMount() {
    this.getTodos();

    this.add$.subscribe(() => {
      this.getTodos();
    });

    store.todoMap$.subscribe((todoMap: any) => {
      this.setState({ todos: Object.values(todoMap) });
    });

    store.todoUpdate$
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        switchMap(todo => axios.put(`/api/auth/todo/${todo.id}`, todo))
      )
      .subscribe();
  }

  componentWillUnmount() {
    this.add$.complete();
  }

  getTodos() {
    const userId = window.localStorage.getItem('userId');
    const resp = axios.get(`/api/auth/todo?userId=${userId}`).then((resp: any) => {
      resp.data.forEach((todo: any) => {
        store.todoAdd$.next(todo);
      });
    });
  }

  onTodoChange = (changedTodo: any) => {
    store.todoUpdate$.next(changedTodo);
  };

  render() {
    const { todos } = this.state;
    return (
      <div
        style={{
          padding: '40px 100px'
        }}
      >
        <TodoCreater
          style={{
            marginBottom: '30px'
          }}
          add$={this.add$}
        />
        <TodoList todos={todos} onTodoChange={this.onTodoChange} />
      </div>
    );
  }
}
