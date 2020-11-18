import React, { Component } from 'react';
import { TodoCreator } from './TodoCreator';
import { appStore } from '../../store/store';
import { AsideBar } from './Aside/AsideBar';

import { AppAction } from '../../store/action';
import { Todo } from '../../type/todo';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, mergeMap, takeUntil } from 'rxjs/operators';

import './TodoPage.css';
import { TodoDetail } from './Detail/TodoDetail';
import { TodoListContainer } from './List/TodoListContainer';
import { Switch, Route } from 'react-router-dom';
import { Calendar } from './Calendar/Calendar';

export class TodoPage extends Component<
  {},
  {
    todos: Todo[];
    selectedTodoId: string;
    selectedBoxId: string;
  }
> {
  state = { todos: [], selectedTodoId: undefined, selectedBoxId: undefined };
  complete$ = new Subject<void>();

  componentDidMount() {
    AppAction.getUserInfo();

    appStore.currentTodoIds$
      .pipe(
        distinctUntilChanged(),
        takeUntil(this.complete$),
        mergeMap((ids: string[]) =>
          appStore.todos$.pipe(
            map(todos =>
              ids
                .map(id => todos.get(id))
                .filter(v => !!v)
                .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
            )
          )
        )
      )
      .subscribe((todos: Todo[]) => {
        this.setState({ todos });
      });

    appStore.selectedBoxId$
      .pipe(distinctUntilChanged(), takeUntil(this.complete$))
      .subscribe((selectedBoxId: string) => {
        this.setState({ selectedBoxId: selectedBoxId });
      });

    appStore.selectedTodoId$
      .pipe(distinctUntilChanged(), takeUntil(this.complete$))
      .subscribe(id => this.setState({ selectedTodoId: id }));
  }

  componentWillUnmount() {
    this.complete$.next();
    this.complete$.complete();
  }

  render() {
    const { todos } = this.state;
    return (
      <div className="todo-page">
        <AsideBar />

        <div
          className="todo-page--main"
          tabIndex={0}
          onKeyDown={event => {
            if (event.key === 'Escape') {
              this.setState({ selectedTodoId: undefined });
            }
          }}
        >
          <div className="main-heading">任务</div>
          <div
            style={{
              padding: '0 20px'
            }}
          >
            <TodoCreator />
          </div>

          <Switch>
            <Route path="calendar">
              <Calendar />
            </Route>
            <Route path="">
              <TodoListContainer todos={todos} />
            </Route>
          </Switch>
        </div>

        <TodoDetail
          todoId={this.state.selectedTodoId}
          onClose={() => {
            this.setState({ selectedTodoId: undefined });
          }}
        />
      </div>
    );
  }
}
