// @flow
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { addTodo, updateTodo } from './store-uitl';

const INIT_TODO_MAP = {};

class Store {
  todoMap$: Subject<any>;
  todoAdd$ = new Subject();
  todoUpdate$ = new Subject();
  todoMapUpdate$ = new Subject();

  constructor() {
    this.todoMap$ = this.todoMapUpdate$.pipe(
      scan((todoMap: any, operation: Function) => {
        return operation(todoMap);
      }, INIT_TODO_MAP)
    );

    this.todoAdd$.pipe(map(addTodo)).subscribe(this.todoMapUpdate$);

    this.todoUpdate$.pipe(map(updateTodo)).subscribe(this.todoMapUpdate$);
  }
}

export default new Store();
