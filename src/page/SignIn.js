// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import { SignInForm } from './SignInForm';
import { setRequestAuth } from '../helper/interceptor.helper';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import './SignIn.scss';

export const SignIn = withRouter(
  class extends Component<{
    history: RouterHistory
  }> {
    signIn = async (data: SignInFormData) => {
      try {
        const resp: AxiosXHR<{ token: string, id: string }> = await axios.post('/api/signin', data);
        window.localStorage.setItem('jwt', resp.data.token);
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
);
