import React, { Component, KeyboardEvent } from 'react';
import message from 'antd/lib/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './TodoCreator.css';
import { AppAction } from '../../action';
  
export interface CreateTodoInput {
  content: string;
}

export class TodoCreator extends Component<
  {
    onCreated?: () => void
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
    });

    this.props.onCreated && this.props.onCreated();

    this.resetForm();

    message.success('Add todo successful');
  };

  onDeadlineChange = (value: any) => {
    this.setState({ deadline: value });
  };

  private resetForm(): void {
    this.setState({ content: '', deadline: null });
  }

  render() {
    return (
      <div className="todo-creator">
        <FontAwesomeIcon icon={faPlus} />
        <input
          placeholder="Add Todo.."
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
