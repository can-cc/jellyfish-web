// @flow
import React, { Component } from 'react';
import Collapse from 'antd/lib/collapse';
import List from 'antd/lib/list';

import { TodoItem } from './TodoItem';

const Panel = Collapse.Panel;

class TodoCollection extends Component<{ todos: any[], onTodoChange: any }, {}> {
  return() {
    <List
      size="large"
      header={null}
      footer={null}
      dataSource={this.props.todos}
      renderItem={todo => <TodoItem todo={todo} onChange={this.props.onTodoChange} />}
    />;
  }
}

export class TodoList extends Component<{ todos: any[], onTodoChange: any }> {
  render() {
    return (
      <div>
        <TodoCollection todos={this.props.todos} onTodoChange={this.props.onTodoChange} />
        <Collapse>
          <Panel header="This is panel header 1" key="1">
            <List
              size="large"
              header={null}
              footer={null}
              bordered
              dataSource={this.props.todos}
              renderItem={todo => <TodoItem todo={todo} onChange={this.props.onTodoChange} />}
            />
          </Panel>
        </Collapse>
      </div>
    );
  }
}
