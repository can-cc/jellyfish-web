import React, { Component } from 'react';
import { TagSelect } from '../../component/TagSelect';
import { TodoStatus } from '../../model/todo-status';
import './TodoFilter.css';

const tagOptions = [
  {
    value: TodoStatus.Doning,
    viewValue: 'Doning',
    icon: 'walking'
  },
  {
    value: TodoStatus.All,
    viewValue: 'All Todo',
    icon: 'list'
  },
  {
    value: TodoStatus.Done,
    viewValue: 'Done',
    icon: 'checkSquare'
  },
 
];

export class TodoFilter extends Component {
  render() {
    return (
      <div>
        <TagSelect options={tagOptions} defaultSelectedValue={TodoStatus.Doning} />
      </div>
    );
  }
}
