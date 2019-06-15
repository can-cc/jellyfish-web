import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../../component/ImageUpload/ImageUpload';
import { AppAction } from '../../action';
import store from '../../store/store';
import { UserInfo } from '../../model/user-info';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

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
  public complete$ = new Subject<void>();

  public componentDidMount() {}

  public componentWillMount() {
    AppAction.getUserInfo();

    store.userInfo$.pipe(takeUntil(this.complete$)).subscribe((userInfo: UserInfo) => {
      this.setState({
        avatarUrl: userInfo.avatarUrl
      })
    });
  }

  public componentWillUnmount() {
    this.complete$.next();
  }

  public uploadAvatar = (imageBase64: string) => {
    axios
      .post('/api/avatar/base64', {
        avatarData: imageBase64
      })
      .then(resp => {
        this.setState({ avatarUrl: resp.data.avatarUrl });
      });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <ImageUpload imageSource={this.state.avatarUrl} onCrop={this.uploadAvatar} />
          <div>{this.state.username}</div>
        </div>
      </div>
    );
  }
}
