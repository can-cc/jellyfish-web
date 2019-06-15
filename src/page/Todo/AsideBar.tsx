import React, { Component } from 'react';

import { Link } from "react-router-dom";

import './AsideBar.css';

export class AsideBar extends Component<{
  avatarUrl: string;
  username: string;
}, any> {


  render() {
    return (
      <aside className="todo-page-aside">
        <img
          className="todo-page-aside--avatar"
          src={this.props.avatarUrl}
        />

  <div className="todo-page-aside--info">
  <Link to="/profile">{this.props.username}</Link>
    
  </div>
      </aside>
    );
  }
}
