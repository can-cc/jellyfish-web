import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { TodoCreator } from './TodoCreator';
import { appStore } from '../../store/store';
import { AsideBar } from './AsideBar';

import './TodoPage.css';
import { AppAction } from '../../action';
import { Todo } from '../../model/todo';
import { Subject } from 'rxjs';
import { UserInfo } from '../../model/user-info';
import { TodoFilter } from './TodoFilter';
import axios from 'axios';

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

    appStore.todos$.subscribe((todos: Todo[]) => {
      this.setState({ todos });
    });

    // appStore.userInfo$.pipe(takeUntil(this.complete$)).subscribe((userInfo: UserInfo) => {
    //   this.setState({
    //     username: userInfo.username
    //   });
    //
    //   // axios
    //   //   .get(`/api/avatar/${userInfo.id}`)
    //   //   .then(r => r.data)
    //   //   .then(avatar => {
    //   //     this.setState({
    //   //       avatarUrl: avatar
    //   //     });
    //   //   });
    // });
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

        <div>
          <TodoCreator />
          <TodoList todos={todos} />
        </div>

        <TodoFilter />
      </div>
    );
  }
}
