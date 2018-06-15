// @flow
import React, { Component } from 'react';
import logo from './logo.svg';
import Button from 'antd/lib/button';
import { Router, Route, Link } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { SignIn } from './page/SignIn';
import { SignUp } from './page/SignUp/SignUp';
import { Home } from './page/Home';
import { TodoPage } from './page/Todo/TodoPage';
import { history } from './history';

import './App.css';

import todoStore from './store/todoStore';
const stores = {
  todoStore
};

class App extends Component<{}> {
  render() {
    return (
      <Provider {...stores}>
        <Router history={history}>
          <div className="App">
            <Route exact path="/" component={Home} />
            <Route path="/signin" component={SignIn} />
            <Route path="/signup" component={SignUp} />
            <Route path="/todo" component={TodoPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
