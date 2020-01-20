import React, { Component } from 'react';
import { TagSelect } from '../../../component/TagSelect/TagSelect';
import { TodoTag } from '../../../model/todo-tag';
import './TodoFilter.css';
import { AppAction } from '../../../action';
import { Subject } from 'rxjs';
import { appStore } from '../../../store/store';
import { takeUntil } from 'rxjs/operators';

const tagOptions = [
  {
    value: TodoTag.Doing,
    viewValue: '进行中',
    icon: 'walking'
  },
  {
    value: TodoTag.All,
    viewValue: '全部',
    icon: 'list'
  },
  {
    value: TodoTag.Done,
    viewValue: '已完成',
    icon: 'checkSquare'
  }
];

export class TodoFilter extends Component<
  any,
  {
    selectedTag: TodoTag;
  }
> {
  state = {
    selectedTag: null
  };
  complete$ = new Subject();

  componentWillMount() {
    appStore.filterTag$.pipe(takeUntil(this.complete$)).subscribe((tag: TodoTag) => {
      this.setState({
        selectedTag: tag
      });
    });
  }

  componentWillUnmount() {
    this.complete$.next();
    this.complete$.complete();
  }

  onTagChange(selectedTag: TodoTag): void {
    AppAction.updateTodoTag(selectedTag);
    AppAction.getTodos();
  }

  render() {
    return (
      <div>
        <TagSelect
          options={tagOptions}
          defaultSelectedValue={this.state.selectedTag}
          onChange={this.onTagChange}
        />
      </div>
    );
  }
}
