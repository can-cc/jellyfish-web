import React, { Component } from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import ReactModal from 'react-modal';
import { SignIn } from './page/SignIn';
import { SignUp } from './page/SignUp/SignUp';
import { TodoPage } from './page/Todo/TodoPage';
import { ProfilePage } from './page/Profile/ProfilePage';
import { history } from './history';

import './App.css';

ReactModal.setAppElement('#root')

export class App extends Component<any> {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Route exact path="/" component={() => <Redirect to="/todo" />} />
          <Route path="/signin" component={SignIn} />
          <Route path="/signup" component={SignUp} />
          <Route path="/todo" component={TodoPage} />
          <Route path="/profile" component={ProfilePage} />
        </div>
      </Router>
    );
  }
}
