import React, { Component } from 'react';
import axios from 'axios';
import { TodoList } from './TodoList';
import { TodoCreator } from './TodoCreator';
import { distinctUntilChanged, switchMap, takeUntil } from 'rxjs/operators';
import store from '../../store/store';
import { AsideBar } from './AsideBar';

import './TodoPage.css';
import { AppAction } from '../../action';
import { Todo } from '../../model/todo';
import { Subject } from 'rxjs';
import { UserInfo } from '../../model/user-info';
import { userInfo } from 'os';

export class TodoPage extends Component<
  {},
  {
    todos: Todo[];
    avatarUrl: string;
    username: string;
  }
> {
  state = { todos: [], avatarUrl: '', username: '' };
  complete$ = new Subject<void>();

  componentDidMount() {
    AppAction.getTodos();
    AppAction.getUserInfo();

    store.todoMap$.subscribe(todoMap => {
      this.setState({ todos: Object.values(todoMap) });
    });

    store.todoUpdate$
      .pipe(
        distinctUntilChanged(),
        switchMap((todo: any) => axios.put(`/api/auth/todo/${todo.id}`, todo))
      )
      .subscribe();

    store.userInfo$.pipe(takeUntil(this.complete$)).subscribe((userInfo: UserInfo) => {
      this.setState({
        username: userInfo.username,
        avatarUrl: userInfo.avatarUrl
      });
    });
  }

  componentWillUnmount() {
    this.complete$.next();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-page">
        <AsideBar avatarUrl={this.state.avatarUrl} username={this.state.username} />

        <div>
          <TodoCreator />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}
