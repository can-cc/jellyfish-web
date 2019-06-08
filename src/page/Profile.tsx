import React, { Component } from 'react';
import axios from 'axios';
import { ImageUpload } from '../component/ImageUpload/ImageUpload';

export class Profile extends Component {
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

  uploadAvatar = (imageBase64: any) => {
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
