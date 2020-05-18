import React, { Component, KeyboardEvent } from 'react';
import message from 'antd/lib/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './TodoCreator.css';
import { AppAction } from '../../action';

export class TodoCreator extends Component<
  {
    onCreated?: () => void;
  },
  {
    value: string;
    content: string;
    deadline: Date | null;
  }
> {
  public state = { value: '', content: '', deadline: null };

  handleChange = (event: any) => {
    this.setState({ content: event.target.value });
  };

  handleKeyPress = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') {
      return;
    }

    AppAction.createTodo({
      content: this.state.content,
      deadline: this.state.deadline
    })
      .then(() => {
        message.success('添加成功');
        AppAction.getTodos();
        this.props.onCreated && this.props.onCreated();
        this.resetForm();
      })
      .catch(() => {
        message.error('添加任务失败，请检查网络');
      });
  };

  onDeadlineChange = (value: any) => {
    this.setState({ deadline: value });
  };

  render() {
    return (
      <div className="todo-creator">
        <FontAwesomeIcon icon={faPlus} />
        <input
          placeholder="添加任务"
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }

  private resetForm(): void {
    this.setState({ content: '', deadline: null });
  }
}
