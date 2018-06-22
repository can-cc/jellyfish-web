// @flow
import React, { Component } from 'react';
import axios from 'axios';
import { SignUpForm } from './SignUpForm';
import { withRouter, RouterHistory } from 'react-router-dom';
import message from 'antd/lib/message';

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

    signUp = (data: SignInFormData) => {
      axios
        .post('/api/signup', data)
        .then(() => {
          this.props.history.push('/signin');
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            message.error('验证码错误，请重试');
          } else {
            message.error('注册失败，请检查是否用户名重复');
          }
        });
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
          <SignUpForm submit={this.signUp} />
        </div>
      );
    }
  }
);
