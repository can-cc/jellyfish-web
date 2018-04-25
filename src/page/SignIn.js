// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import { SignInForm } from './SignInForm';
import { setRequestAuth } from '../helper/interceptor.helper';

export class SignIn extends Component<{}> {
  signIn = async (data: SignInFormData) => {
    try {
      const resp: AxiosXHR<{ token: string, id: string }> = await axios.post('/api/signin', data);
      window.localStorage.setItem('jwt', resp.data.token);
      window.localStorage.setItem('userId', resp.data.id);
      setRequestAuth();
    } catch (error) {}
  };

  render() {
    return (
      <div>
        <SignInForm submit={this.signIn} />
      </div>
    );
  }
}
