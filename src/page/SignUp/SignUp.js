// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import { SignUpForm } from './SignUpForm';
import { BrowserRouter as Router, Route, Link, Redirect, withRouter } from 'react-router-dom';

import './SignUp.css';

export const SignUp = withRouter(
  class extends Component<
    {
      history: RouterHistory
    },
    {
      fromApp: boolean
    }
  > {
    state = {
      fromApp: false
    };

    componentWillMount() {
      const fromApp = this.props.history.location.search.indexOf('fromApp=true') >= 0;
      this.setState({ fromApp });
    }

    signIn = async (data: SignInFormData) => {
      try {
        const resp: AxiosXHR<{ token: string, id: string }> = await axios.post('/api/signup', data);

        this.props.history.push('/signin');
      } catch (error) {}
    };

    render() {
      return (
        <div
          className="signup-page"
          style={{ padding: '20px', maxWidth: '500px', margin: 'auto auto' }}
        >
          <img
            style={{
              width: '70px',
              height: '70px',
              marginBottom: '30px'
            }}
            className="signup-logo"
            alt="logo"
            src="/assets/imgs/logo.png"
          />
          <SignUpForm submit={this.signIn} />
        </div>
      );
    }
  }
);
