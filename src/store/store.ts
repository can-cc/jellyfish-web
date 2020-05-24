import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserInfo } from '../type/user-info';
import { TodoTag } from '../type/todo-tag';
import { Todo } from '../type/todo';
import { Box } from '../type/box';
import { map, scan, shareReplay } from 'rxjs/operators';

export class AppStore {
  public currentTodoIds$ = new BehaviorSubject<string[]>([]);
  public selectedTodoID$: Subject<string> = new BehaviorSubject(null);
  public todos$: Observable<Map<string, Todo>>;
  private updateTodo$: Subject<(todos: Map<string, Todo>) => Map<string, Todo>> = new Subject();
  public addTodoList$ = new Subject<Todo[]>();

  public userInfo$: Subject<UserInfo> = new Subject();
  public filterTag$: BehaviorSubject<TodoTag> = new BehaviorSubject<TodoTag>(TodoTag.Doing);
  public boxes$: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>([]);
  public selectedBoxId$ = new BehaviorSubject<string>(null);

  constructor() {
    this.todos$ = this.updateTodo$.pipe(
      scan(
        (todos: Map<string, Todo>, updateFn: (todos: Map<string, Todo>) => Map<string, Todo>) => {
          return updateFn(todos);
        },
        new Map<string, Todo>()
      ),
      shareReplay(1)
    );

    this.addTodoList$
      .pipe(
        map((todoList: Todo[]) => (todos: Map<string, Todo>): Map<string, Todo> => {
          todoList.forEach(todo => todos.set(todo.id, todo));
          return todos;
        })
      )
      .subscribe(this.updateTodo$);
  }
}

export const appStore = new AppStore();
