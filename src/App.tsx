import React, { Component } from 'react';
import { Redirect, Route, Router, Switch } from 'react-router-dom';
import { Login } from './page/Login/Login';
import { SignUp } from './page/SignUp/SignUp';
import { TodoPage } from './page/Todo/TodoPage';
import { ProfilePage } from './page/Profile/ProfilePage';
import { history } from './history';
import { AppStoreContext } from './context/store-context';

import './App.css';
import { appStore } from './store/store';

export class App extends Component {
  render() {
    return (
      <AppStoreContext.Provider value={appStore}>
        <Router history={history}>
          <div className="App">
            <Switch>
              <Route exact path="/">
                <Redirect to="/home" />
              </Route>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/signup">
                <SignUp />
              </Route>
              <Route path="/home">
                <TodoPage />
              </Route>
              <Route path="/profile">
                <ProfilePage />>
              </Route>
              <Route path="*">
                <Redirect to="/home" />
              </Route>
            </Switch>
          </div>
        </Router>
      </AppStoreContext.Provider>
    );
  }
}
