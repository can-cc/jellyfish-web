import React, { Component, KeyboardEvent } from 'react';
import axios from 'axios';
import message from 'antd/lib/message';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import './TodoCreator.css';
  
export interface CreateTodoInput {
  content: string;
}

export class TodoCreator extends Component<
  any,
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
    try {
      const deadline: number = this.state.deadline ? this.state.deadline!.valueOf() : null;

      axios
        .post('/api/auth/todo', {
          content: this.state.content,
          deadline
        })
        .then();

      this.resetForm();
      this.props.add$.next();
      message.success('Add todo successful');
    } catch (error) {
      console.error(error);
      message.error('Add a todo failure, please retry later.');
    }
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
          value={this.state.content}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
        />
      </div>
    );
  }
}
