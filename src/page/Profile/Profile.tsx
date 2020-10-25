import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../../component/ImageUpload/ImageUpload';
import { AppAction } from '../../store/action';
import { appStore } from '../../store/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { generateAvatar } from '../../helper/avatar.helper';

export class Profile extends Component<
  {},
  {
    loading: boolean;
    avatar: string;
    username: string;
  }
> {
  public state = {
    loading: false,
    avatar: undefined,
    username: ''
  };
  public complete$ = new Subject<void>();

  public componentDidMount() {}

  public componentWillMount() {
    AppAction.getUserInfo();
    appStore.userInfo$.pipe(takeUntil(this.complete$)).subscribe(a => {
      this.setState({ avatar: a.avatar });
    });
  }

  public componentWillUnmount() {
    this.complete$.next();
  }

  public uploadAvatar = (imageBase64: string) => {
    axios
      .post('/api/user/avatar', {
        avatar: imageBase64.substring(imageBase64.indexOf(',') + 1)
      })
      .then(() => {
        AppAction.getUserInfo();
      });
  };

  render() {
    return (
      <div>
        <h1>Profile</h1>
        <div style={{ textAlign: 'center' }}>
          <ImageUpload imageSource={generateAvatar(this.state.avatar)} onCrop={this.uploadAvatar} />
          <div>{this.state.username}</div>
        </div>
      </div>
    );
  }
}
