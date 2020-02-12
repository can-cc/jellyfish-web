import React, { Component, useEffect } from 'react';

import { Link } from 'react-router-dom';

import './AsideBar.css';
import { AppStoreContext } from '../../../context/store-context';
import { AppStore } from '../../../store/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TodoBoxes } from './Boxes/TodoBoxes';
import { TodoSearcher } from './TodoSearcher/TodoSearcher';
import { TodoFilter } from './TodoFilter';
import { generateAvatar } from '../../../helper/avatar.helper';

export class AsideBar extends Component<
  {},
  {
    username?: string;
    avatar?: string;
  }
> {
  state = { avatar: undefined, username: undefined };
  complete$ = new Subject();
  appStore: AppStore;

  componentDidMount(): void {
    this.appStore.userInfo$
      .pipe(takeUntil(this.complete$))
      .subscribe(u => this.setState({ username: u.username, avatar: u.avatar }));
  }

  componentWillUnmount(): void {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    return (
      <AppStoreContext.Consumer>
        {(appStore: AppStore) => {
          if (!this.appStore) {
            this.appStore = appStore;
          }

          return (
            <aside className="todo-page-aside">
              <TodoSearcher />

              <img
                alt=""
                className="todo-page-aside--avatar"
                src={generateAvatar(this.state.avatar)}
              />

              <div className="todo-page-aside--info">
                <Link to="/profile">{this.state.username}</Link>
              </div>

              <TodoFilter />

              <TodoBoxes />
            </aside>
          );
        }}
      </AppStoreContext.Consumer>
    );
  }
}
