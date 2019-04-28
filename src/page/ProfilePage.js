//      
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Subject } from 'rxjs';
import update from 'ramda/src/update';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Profile } from './Profile';

import store from '../store/';

export class ProfilePage extends Component         {
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
