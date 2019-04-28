//      
import React, { Component } from 'react';
import axios from 'axios';
import { SignInForm } from './SignInForm';
import { setRequestAuth } from '../helper/interceptor.helper';
import { withRouter } from 'react-router-dom';

import './SignIn.css';

export const SignIn = withRouter(
  class extends Component  
                          
     {
    signIn = async (data                ) => {
      try {
        const resp                                          = await axios.post('/api/signin', data);
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
