import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../component/ImageUpload/ImageUpload';
import { AppAction } from '../action';
import store from '../store/store';
import { UserInfo } from '../model/user-info';

export class Profile extends Component<any, {
  loading: boolean,
  avatarUrl: string | null,
  username: string
}> {

  public state = {
    loading: false,
    avatarUrl: null,
    username: ''
  };

  public componentDidMount() {}

  public componentWillMount() {
    AppAction.getUserInfo(window.localStorage.getItem('userId'));

    store.userInfo$.subscribe((userInfo: UserInfo) => {
      this.setState({
        avatarUrl: userInfo.avatarUrl
      })
    });
  }

  public uploadAvatar = (imageBase64: any) => {
    axios
      .post('/api/auth/avatar/base64', {
        avatarData: imageBase64
      })
      .then(resp => {
        this.setState({ avatarUrl: resp.data.avatar });
      });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <ImageUpload source={this.state.avatarUrl} upload={this.uploadAvatar} />
          <div>{this.state.username}</div>
        </div>
      </div>
    );
  }
}
