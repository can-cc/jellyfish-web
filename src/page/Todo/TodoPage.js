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
    this.getCycleTodoDone();

    this.add$.subscribe(() => {
      this.getTodos();
    });

    store.todoMap$.subscribe((todoMap: any) => {
      this.setState({ todos: Object.values(todoMap) });
    });

    store.todoUpdate$
      .pipe(distinctUntilChanged(), switchMap(todo => axios.put(`/api/auth/todo/${todo.id}`, todo)))
      .subscribe();

    store.todoCycleUpdate$
      .pipe(
        distinctUntilChanged(),
        switchMap(todo =>
          axios.post(`/api/auth/todo/${todo.id}/cycle`, {
            todoId: todo.id,
            done: todo.done
          })
        )
      )
      .subscribe();

    axios.get(`/api/auth/user/${window.localStorage.getItem('userId')}`).then(resp => {
      this.setState({ avatar: resp.data.avatar, username: resp.data.username });
    });
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

  getCycleTodoDone() {
    const userId = window.localStorage.getItem('userId');
    const resp = axios.get(`/api/auth/todo/cycle?userId=${userId}`).then((resp: any) => {
      console.log('resp', resp);
    });
  }

  onTodoDoneChange = (changedTodo: any) => {
    if (changedTodo.type === 'HABIT') {
      store.todoCycleUpdate$.next(changedTodo);
    } else {
      store.todoUpdate$.next(changedTodo);
    }
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
        <img
          src={this.state.avatar}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            display: 'block',
            margin: 'auto',
            marginBottom: '50px'
          }}
        />
        <TodoCreater
          style={{
            marginBottom: '30px'
          }}
          add$={this.add$}
        />
        <TodoList todos={todos} onTodoDoneChange={this.onTodoDoneChange} />
      </div>
    );
  }
}
