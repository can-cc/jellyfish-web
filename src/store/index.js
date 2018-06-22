// @flow
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

const INIT_TODO_MAP = {};

class Store {
  todoMap$: Subject<any>;
  todoAdd$ = new Subject();
  todoUpdate$ = new Subject();

  constructor() {
    this.todoMap$ = this.todoUpdate$.pipe(
      scan((todoMap: any, operation: Function) => {
        return operation(todoMap);
      }, INIT_TODO_MAP)
    );

    this.todoAdd$
      .pipe(
        map((todo: any) => {
          return (todoMap: any) => {
            return {
              ...todoMap,
              [todo.id]: todo
            };
          };
        })
      )
      .subscribe(this.todoUpdate$);
  }
}

export default new Store();
