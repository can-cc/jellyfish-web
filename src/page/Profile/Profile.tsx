import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../../component/ImageUpload/ImageUpload';
import { AppAction } from '../../action';
import { AppStore } from '../../store/store';
import { Subject } from 'rxjs';
import { AppStoreContext } from '../../context/store-context';
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
      <AppStoreContext.Consumer>
        {(appStore: AppStore) => {
          appStore.userInfo$.pipe(takeUntil(this.complete$)).subscribe(a => {
            this.setState({ avatar: a.avatar });
          });
          return (
            <div>
              <div style={{ textAlign: 'center' }}>
                <ImageUpload
                  imageSource={generateAvatar(this.state.avatar)}
                  onCrop={this.uploadAvatar}
                />
                <div>{this.state.username}</div>
              </div>
            </div>
          );
        }}
      </AppStoreContext.Consumer>
    );
  }
}
