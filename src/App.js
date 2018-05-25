// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'antd/lib/button';
import { Router, Route, Link } from 'react-router-dom';
import './App.css';

import { SignIn } from './page/SignIn';
import { SignUp } from './page/SignUp/SignUp';
import { Home } from './page/Home';
import { TodoPage } from './page/Todo/TodoPage';
import { history } from './history';

class App extends Component<{}> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/todo" component={TodoPage} />
        </div>
      </Router>
    );
  }
}

export default App;
