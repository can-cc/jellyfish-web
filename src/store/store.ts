import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { UserInfo } from '../type/user-info';
import { TodoStatus } from '../type/todo-status';
import { Todo } from '../type/todo';
import { Box } from '../type/box';
import { map, scan, shareReplay } from 'rxjs/operators';

export class AppStore {
  public currentTodoIds$ = new BehaviorSubject<string[]>([]);
  public selectedTodoId$: Subject<string> = new BehaviorSubject(null);
  public todos$: Observable<Map<string, Todo>>;
  private updateTodoMap$: Subject<(todos: Map<string, Todo>) => Map<string, Todo>> = new Subject();
  public addTodoList$ = new Subject<Todo[]>();
  public updateTodo$ = new Subject<Todo>();
  public userInfo$: Subject<UserInfo> = new Subject();
  public statusFilter$: BehaviorSubject<TodoStatus> = new BehaviorSubject<TodoStatus>(
    TodoStatus.Doing
  );
  public boxes$: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>([]);
  public selectedBoxId$ = new BehaviorSubject<string>(null);

  constructor() {
    this.todos$ = this.updateTodoMap$.pipe(
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
      .subscribe(this.updateTodoMap$);

    this.updateTodo$
      .pipe(
        map(todo => {
          return (todos: Map<string, Todo>) => {
            todos.set(todo.id, {
              ...todos.get(todo.id),
              ...todo
            });
            return todos;
          };
        })
      )
      .subscribe(this.updateTodoMap$);
  }
}

export const appStore = new AppStore();
