import React, { Component } from 'react';

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
      </div>
    );
  }
}
