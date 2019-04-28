//      
import React, { Component } from 'react';
import axios from 'axios';
import Button from 'antd/lib/button';
import message from 'antd/lib/message';
import Input from 'antd/lib/input';
import Select from 'antd/lib/select';
import DatePicker from 'antd/lib/date-picker';
import { Subject } from 'rxjs';
import Moment from 'moment';

const InputGroup = Input.Group;
const Option = Select.Option;

export class TodoCreater extends Component 
                                      
   
                    
                     
                
   
  {
  state = { value: '', type: 'NORMAL' };

  handleChange = (event                                  ) => {
    this.setState({ content: event.target.value });
  };

  handleKeyPress = async (event                                  ) => {
    if (event.key === 'Enter') {
      try {
        await axios.post('/api/auth/todo', {
          content: this.state.content,
          deadline: this.state.deadline ? this.state.deadline.valueOf() : null,
          type: this.state.type
        });
        this.setState({ content: null, deadline: null });
        this.props.add$.next();
        message.success('Add todo successful');
      } catch (error) {
        console.error(error);
        message.error('Add a todo failure, please retry later.');
      }
    }
  };

  onDeadlineChange = value => {
    this.setState({ deadline: value });
  };

  onTodoTypeChange = value => {
    this.setState({ type: value });
  };

  render() {
    return (
      <div style={this.props.style}>
        <InputGroup
          compact
          style={{
            display: 'flex',
            justifyContent: 'center',
            transform: 'scale(1.3, 1.3)'
          }}
        >
          <Select defaultValue="NORMAL" onChange={this.onTodoTypeChange}>
            <Option value="NORMAL">待办</Option>
            <Option value="HABIT">习惯</Option>
          </Select>
          <Input
            style={{ width: '50%' }}
            value={this.state.content}
            onChange={this.handleChange}
            onKeyPress={this.handleKeyPress}
          />
          <DatePicker
            value={this.state.deadline}
            onChange={this.onDeadlineChange}
            placeholder="截止时间"
          />
        </InputGroup>
      </div>
    );
  }
}
