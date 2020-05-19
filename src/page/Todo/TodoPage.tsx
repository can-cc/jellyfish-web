import React, { Component } from 'react';
import { TodoList } from './TodoList';
import { TodoCreator } from './TodoCreator';
import { AppStore, appStore } from '../../store/store';
import { AsideBar } from './Aside/AsideBar';

import { AppAction } from '../../action';
import { Todo } from '../../type/todo';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';

import './TodoPage.css';
import { TodoDetail } from './Detail/TodoDetail';
import { AppStoreContext } from '../../context/store-context';

export class TodoPage extends Component<
  {},
  {
    todos: Todo[];
    selectedTodoID: string;
  }
> {
  state = { todos: [], selectedTodoID: undefined };
  complete$ = new Subject<void>();
  store: AppStore;

  componentDidMount() {
    AppAction.getTodos();
    AppAction.getUserInfo();

    appStore.todos$
      .pipe(distinctUntilChanged(), takeUntil(this.complete$))
      .subscribe((todos: Todo[]) => {
        this.setState({ todos });
      });

    this.store.selectedTodoID$
      .pipe(distinctUntilChanged(), takeUntil(this.complete$))
      .subscribe(id => this.setState({ selectedTodoID: id }));
  }

  componentWillUnmount() {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    const { todos } = this.state;
    return (
      <AppStoreContext.Consumer>
        {(store: AppStore) => {
          if (!this.store) {
            this.store = store;
          }

          return (
            <div className="todo-page">
              <AsideBar />

              <div className="todo-page--main">
                <div className="main-heading">任务</div>
                <div
                  style={{
                    padding: '0 20px'
                  }}
                >
                  <TodoCreator />
                </div>
                <TodoList todos={todos} selectedTodoID={this.state.selectedTodoID} />
              </div>

              <TodoDetail todoID={this.state.selectedTodoID} />
            </div>
          );
        }}
      </AppStoreContext.Consumer>
    );
  }
}
