// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Subject } from 'rxjs';
import update from 'ramda/src/update';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Upload, Icon, message } from 'antd';
import store from '../store/';
import { ImageUpload } from '../component/ImageUpload/ImageUpload';

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

export class Profile extends Component<
  {},
  {
    loading: boolean,
    avatar: string,
    username: string
  }
> {
  state = {
    loading: false,
    avatar: null,
    username: ''
  };

  componentDidMount() {}

  componentWillMount() {
    axios.get(`/api/auth/user/${window.localStorage.getItem('userId')}`).then(resp => {
      this.setState({ avatar: resp.data.avatar, username: resp.data.username });
    });
  }

  uploadAvatar = (imageBase64: string) => {
    axios
      .post('/api/auth/avatar/base64', {
        avatar: imageBase64
      })
      .then(resp => {
        this.setState({ avatar: resp.data.avatar });
      });
  };

  render() {
    return (
      <div>
        <div style={{ textAlign: 'center' }}>
          <ImageUpload source={this.state.avatar} upload={this.uploadAvatar} />
          <div>{this.state.username}</div>
        </div>
      </div>
    );
  }
}
