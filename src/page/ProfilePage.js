import React, { Component } from 'react';
import { Profile } from './Profile';

export class ProfilePage extends Component {
  componentDidMount() {}

  componentWillUnmount() {}

  render() {
    return (
      <div
        style={{
          padding: '40px 20px'
        }}
      >
        <Profile />
      </div>
    );
  }
}
