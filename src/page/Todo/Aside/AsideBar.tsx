import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './AsideBar.css';
import { AppStoreContext } from '../../../context/store-context';
import { AppStore } from '../../../store/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TodoBoxes } from './Boxes/TodoBoxes';
import { TodoSearcher } from './TodoSearcher/TodoSearcher';
import { TodoFilter } from './TodoFilter';

export class AsideBar extends Component<
  {},
  {
    username?: string;
    avatar?: string;
  }
> {
  state = { avatar: undefined, username: undefined };
  complete$ = new Subject();

  componentDidMount(): void {}

  componentWillUnmount(): void {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    return (
      <AppStoreContext.Consumer>
        {(appStore: AppStore) => {
          appStore.userAvatar$
            .pipe(takeUntil(this.complete$))
            .subscribe(a => this.setState({ avatar: a }));
          appStore.userInfo$
            .pipe(takeUntil(this.complete$))
            .subscribe(u => this.setState({ username: u.username }));

          return (
            <aside className="todo-page-aside">
              <TodoSearcher />

              <img
                alt="todo-page-aside--avatar"
                className="todo-page-aside--avatar"
                src={this.state.avatar}
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
