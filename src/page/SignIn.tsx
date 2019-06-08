//
import React, { Component } from 'react';
import axios from 'axios';
import { SignInForm } from './SignInForm';
import { setRequestAuth } from '../helper/interceptor.helper';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './SignIn.css';

class SignInPage extends Component<RouteComponentProps & {}, any> {
  signIn = async (cred: { username: string; password: string }) => {
    try {
      const resp = await axios.post('/api/signin', cred);
      window.localStorage.setItem('auth-token', resp.data.token);
      window.localStorage.setItem('userId', resp.data.id);

      setRequestAuth();

      this.props.history.push('/todo');
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <img className="signin-logo" alt="logo" src="/assets/imgs/logo.png" />
        <SignInForm submit={this.signIn} />
      </div>
    );
  }
}

export const SignIn = withRouter(SignInPage);
