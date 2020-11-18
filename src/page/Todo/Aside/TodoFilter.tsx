import React, { Component } from 'react';
import { TagSelect } from '../../../component/TagSelect/TagSelect';
import { TodoStatus } from '../../../type/todo-status';
import './TodoFilter.css';
import { AppAction } from '../../../store/action';
import { Subject } from 'rxjs';
import { appStore } from '../../../store/store';
import { takeUntil } from 'rxjs/operators';

const tagOptions = [
  {
    value: TodoStatus.Doing,
    viewValue: '进行中',
    icon: 'walking'
  },
  {
    value: TodoStatus.All,
    viewValue: '全部',
    icon: 'list'
  },
  {
    value: TodoStatus.Done,
    viewValue: '已完成',
    icon: 'checkSquare'
  }
];

export class TodoFilter extends Component<
  any,
  {
    selectedTag: TodoStatus;
  }
> {
  state = {
    selectedTag: null
  };
  complete$ = new Subject();

  componentWillMount() {
    appStore.statusFilter$.pipe(takeUntil(this.complete$)).subscribe((tag: TodoStatus) => {
      this.setState({
        selectedTag: tag
      });
    });
  }

  componentWillUnmount() {
    this.complete$.next();
    this.complete$.complete();
  }

  onTagChange(selectedTag: TodoStatus): void {
    AppAction.updateTodoTag(selectedTag);
    AppAction.getTodos();
  }

  render() {
    return (
      <div className="TodoFilter">
        <TagSelect
          options={tagOptions}
          defaultSelectedValue={this.state.selectedTag}
          onChange={this.onTagChange}
        />
      </div>
    );
  }
}
