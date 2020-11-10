import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './AsideBar.css';
import { appStore } from '../../../store/store';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TodoBoxes } from './Boxes/TodoBoxes';
import { TodoSearcher } from './TodoSearcher/TodoSearcher';
import { TodoFilter } from './TodoFilter';
import { generateAvatar } from '../../../helper/avatar.helper';
import { ColorBgPrimary } from '../../../constant/Color';
import { AppAction } from '../../../store/action';

export class AsideBar extends Component<
  {},
  {
    username?: string;
    avatar?: string;
  }
> {
  state = { avatar: undefined, username: undefined };
  complete$ = new Subject();

  componentDidMount(): void {
    appStore.userInfo$
      .pipe(takeUntil(this.complete$))
      .subscribe((u) => this.setState({ username: u.username, avatar: u.avatar }));

    AppAction.getBoxes().then();
  }

  componentWillUnmount(): void {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    return (
      <aside
        style={{
          backgroundColor: ColorBgPrimary,
        }}
        className="todo-page-aside"
      >
        <TodoSearcher />

        <Link to="/profile">
          <img alt="" className="todo-page-aside--avatar" src={generateAvatar(this.state.avatar)} />
        </Link>

        <div className="todo-page-aside--info">
          <Link to="/profile">{this.state.username}</Link>
        </div>

        <TodoFilter />

        <TodoBoxes />
      </aside>
    );
  }
}
