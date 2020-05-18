import React, { Component } from 'react';
import axios from 'axios';
import { LoginForm } from './LoginForm';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { authService } from '../../service/auth.service';
import { appInterceptorService } from '../../service/interceptor.service';
import { ResponseAuthHeaderKey } from '../../config/constrant';
import { ColorBgPrimary } from '../../Constant/Color';

class LoginPage extends Component<RouteComponentProps & {}, any> {
  signIn = async (cred: { username: string; password: string }) => {
    try {
      const resp = await axios.post('/api/login', cred);
      authService.onLoggedIn(resp.headers[ResponseAuthHeaderKey]);
      appInterceptorService.setupAxiosInterceptor();
      this.props.history.push('/');
    } catch (error) {
      throw error;
    }
  };

  render() {
    return (
      <div style={{ display: 'flex', height: '100%' }}>
        <div
          style={{
            width: '100%',
            height: '100%',
            color: 'white',
            backgroundColor: ColorBgPrimary,
            paddingRight: 30,
            paddingTop: 28,
            display: 'flex',
            alignItems: 'flex-end',
            flexDirection: 'column'
          }}
        >
          <div style={{}}>
            <img
              style={{
                width: 60,
                height: 60
              }}
              alt="logo"
              src="/assets/imgs/logo.png"
            />
            <span
              style={{
                verticalAlign: 'bottom',
                fontSize: 25,
                fontWeight: 'bold',
                marginLeft: 12
              }}
            >
              水母清单
            </span>
          </div>

          <div
            style={{
              marginTop: 28,
              fontSize: 42,
              fontWeight: 'bold',
              width: 280,
              textAlign: 'right',
              lineHeight: 1.2
            }}
          >
            更好地管理你的待办事项
          </div>

          <div style={{ width: 280, marginTop: 20, textAlign: 'right', lineHeight: 1.8 }}>
            在水母清单创建待办清单，规划年度目标，或者为特定的纪念日创建倒数提醒等等
          </div>
        </div>

        <div
          style={{
            width: '51.8%',
            flexShrink: 0,
            flexGrow: 0,
            paddingTop: 50,
            paddingLeft: 40,
            paddingRight: 40,
            height: '100%'
          }}
        >
          <h1>登录</h1>
          <LoginForm submit={this.signIn} />
        </div>
      </div>
    );
  }
}

export const Login = withRouter(LoginPage);