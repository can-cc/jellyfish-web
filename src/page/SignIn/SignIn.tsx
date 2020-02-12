import React, { Component } from 'react';
import axios from 'axios';
import { SignInForm } from './SignInForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import './SignIn.css';
import { authService } from '../../service/auth.service';
import { appInterceptorService } from '../../service/interceptor.service';
import { ResponseAuthHeaderKey } from '../../config/constrant';

class SignInPage extends Component<RouteComponentProps & {}, any> {
  signIn = async (cred: { username: string; password: string }) => {
    try {
      const resp = await axios.post('/api/login', cred);
      authService.onLoggedIn(resp.headers[ResponseAuthHeaderKey]);
      appInterceptorService.setupAxiosInterceptor();
      this.props.history.push('/');
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <div className="signin-window">
          <img className="signin-logo" alt="logo" src="/assets/imgs/logo.png" />
          <SignInForm submit={this.signIn} />
        </div>
      </div>
    );
  }
}

export const SignIn = withRouter(SignInPage);
