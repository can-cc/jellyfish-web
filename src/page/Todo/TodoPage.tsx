import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { TodoCreator } from './TodoCreator';
import { appStore } from '../../store/store';
import { AsideBar } from './Aside/AsideBar';

import { AppAction } from '../../action';
import { Todo } from '../../model/todo';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import './TodoPage.css';

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

    appStore.todos$.pipe(takeUntil(this.complete$)).subscribe((todos: Todo[]) => {
      this.setState({ todos });
    });
  }

  componentWillUnmount() {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-page">
        <AsideBar />

        <div className="todo-page--main">
          <div className="main-heading">任务</div>
          <TodoCreator />
          <TodoList todos={todos} />
        </div>
      </div>
    );
  }
}
