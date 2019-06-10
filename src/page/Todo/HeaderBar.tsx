import React, { Component } from 'react';

import { Link } from "react-router-dom";

export class HeaderBar extends Component<any, any> {



  render() {
    return (
      <div>
        <img
          src={this.props.avatarUrl}
          style={{
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            display: 'block',
            margin: 'auto',
            marginBottom: '50px'
          }}
        />

        <Link to="/profile">user</Link>
      </div>
    );
  }
}
