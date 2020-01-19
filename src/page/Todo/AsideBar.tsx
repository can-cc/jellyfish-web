import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import './AsideBar.css';
import { AppStoreContext } from '../../context/store-context';
import { AppStore } from '../../store/store';
import { map } from 'rxjs/operators';

export class AsideBar extends Component<
  {},
  {
    username?: string;
    avatar?: string;
  }
> {
  state = { avatar: undefined, username: undefined };
  componentDidMount(): void {}

  render() {
    return (
      <AppStoreContext.Consumer>
        {(appStore: AppStore) => {
          appStore.userAvatar$.subscribe(a => this.setState({ avatar: a }));
          appStore.userInfo$.subscribe(u => this.setState({ username: u.username }));

          return (
            <aside className="todo-page-aside">
              <img
                alt="todo-page-aside--avatar"
                className="todo-page-aside--avatar"
                src={this.state.avatar}
              />

              <div className="todo-page-aside--info">
                <Link to="/profile">{this.state.username}</Link>
              </div>
            </aside>
          );
        }}
      </AppStoreContext.Consumer>
    );
  }
}
