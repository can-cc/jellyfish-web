import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { TodoTag } from '../model/todo-tag';
import { Todo } from '../model/todo';

export interface TodoMap {
  [id: string]: any;
}

class Store {
  public todos$: Subject<Todo[]> = new Subject<Todo[]>();

  public user$ = new Subject();
  public userInfo$: Subject<UserInfo> = new Subject();

  public filterTag$: BehaviorSubject<TodoTag> = new BehaviorSubject<TodoTag>(TodoTag.Doing);
}

// TODO: wrap in context
export const AppStore = new Store();