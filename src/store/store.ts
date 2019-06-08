import { Subject, Observable } from 'rxjs';
import { map, scan } from 'rxjs/operators';
import { addTodo, updateTodo } from './store-uitl';

export interface TodoMap {
  [id: string]: any;
}

const INIT_TODO_MAP: TodoMap = {};

class Store {
  public todoAdd$ = new Subject();
  public todoUpdate$ = new Subject();
  public todoMapUpdate$ = new Subject();
  public user$ = new Subject();
  public todoMap$: Observable<TodoMap>;

  constructor() {
    this.todoMap$ = this.todoMapUpdate$.pipe(
      scan((todoMap: any, operation: any) => {
        return operation(todoMap);
      }, INIT_TODO_MAP)
    );

    this.todoAdd$.pipe(map(addTodo)).subscribe(this.todoMapUpdate$);

    this.todoUpdate$.pipe(map(updateTodo)).subscribe(this.todoMapUpdate$);
  }
}

export default new Store();
