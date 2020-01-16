import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../../component/ImageUpload/ImageUpload';
import { AppAction } from '../../action';
import { AppStore } from '../../store/store';
import { UserInfo } from '../../model/user-info';
import { Subject } from 'rxjs';
import { mergeMap, takeUntil } from 'rxjs/operators';

export class Profile extends Component<
  any,
  {
    loading: boolean;
    avatarUrl: string | null;
    username: string;
  }
> {
  public state = {
    loading: false,
    avatarUrl: null,
    username: ''
  };
  public complete$ = new Subject<void>();

  public componentDidMount() {}

  public componentWillMount() {
    AppAction.getUserInfo();

    AppStore.userInfo$
      .pipe(
        takeUntil(this.complete$),
        mergeMap((userInfo: UserInfo) => {
          return axios.get(`/api/avatar/${userInfo.id}`).then(r => r.data);
        })
      )
      .subscribe(avatarBase64 => {
        this.setState({
          avatarUrl: avatarBase64
        });
      });
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
