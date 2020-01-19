import React, { Component } from 'react';
import { TagSelect } from '../../component/TagSelect';
import { TodoTag } from '../../model/todo-tag';
import './TodoFilter.css';
import { AppAction } from '../../action';
import { Subject } from 'rxjs';
import { appStore } from '../../store/store';
import { takeUntil } from 'rxjs/operators';

const tagOptions = [
  {
    value: TodoTag.Doing,
    viewValue: 'Doing',
    icon: 'walking'
  },
  {
    value: TodoTag.All,
    viewValue: 'All',
    icon: 'list'
  },
  {
    value: TodoTag.Done,
    viewValue: 'Done',
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
