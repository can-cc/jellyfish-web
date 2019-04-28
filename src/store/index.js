//      
import { BehaviorSubject, Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { addTodo, updateTodo, updateCycleTodo } from './store-uitl';

const INIT_TODO_MAP = {};

class Store {
                         
  todoAdd$ = new Subject();
  todoUpdate$ = new Subject();
  todoCycleUpdate$ = new Subject();
  todoMapUpdate$ = new Subject();

  constructor() {
    this.todoMap$ = this.todoMapUpdate$.pipe(
      scan((todoMap     , operation          ) => {
        return operation(todoMap);
      }, INIT_TODO_MAP)
    );

    this.todoAdd$.pipe(map(addTodo)).subscribe(this.todoMapUpdate$);

    this.todoUpdate$.pipe(map(updateTodo)).subscribe(this.todoMapUpdate$);
    this.todoCycleUpdate$.pipe(map(updateCycleTodo)).subscribe(this.todoMapUpdate$);
  }
}

export default new Store();
