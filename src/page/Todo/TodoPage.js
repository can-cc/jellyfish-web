// @flow
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import { TodoCreater } from './TodoCreater';
import { TodoList } from './TodoList';

export class TodoPage extends Component<{}> {
  render() {
    return (
      <div>
        <TodoCreater />
        <TodoList />
      </div>
    );
  }
}
