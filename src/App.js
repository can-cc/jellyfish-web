// @flow
import React, { Component } from 'react';
import Button from 'antd/lib/button';
import { Router, Route, Link } from 'react-router-dom';

import { SignIn } from './page/SignIn';
import { SignUp } from './page/SignUp/SignUp';
import { Home } from './page/Home';
import { TodoPage } from './page/Todo/TodoPage';
import { ProfilePage } from './page/ProfilePage';
import { history } from './history';

import './App.css';

class App extends Component<{}> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/todo" component={TodoPage} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </Router>
    );
  }
}

export default App;
