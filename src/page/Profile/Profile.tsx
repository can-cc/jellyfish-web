import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../../component/ImageUpload/ImageUpload';
import { AppAction } from '../../action';
import { AppStore } from '../../store/store';
import { Subject } from 'rxjs';
import { AppStoreContext } from '../../context/store-context';
import { takeUntil } from 'rxjs/operators';

export class Profile extends Component<
  any,
  {
    loading: boolean;
    avatar?: string;
    username: string;
  }
> {
  public state = {
    loading: false,
    avatar: null,
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
        avatar: imageBase64
      })
      .then(resp => {
        this.setState({ avatar: resp.data.avatarUrl });
      });
  };

  render() {
    return (
      <AppStoreContext.Consumer>
        {(appStore: AppStore) => {
          appStore.userAvatar$
            .pipe(takeUntil(this.complete$))
            .subscribe(a => this.setState({ avatar: a }));
          return (
            <div>
              <div style={{ textAlign: 'center' }}>
                <ImageUpload imageSource={this.state.avatar} onCrop={this.uploadAvatar} />
                <div>{this.state.username}</div>
              </div>
            </div>
          );
        }}
      </AppStoreContext.Consumer>
    );
  }
}
