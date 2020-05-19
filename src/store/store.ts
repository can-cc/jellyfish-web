import { BehaviorSubject, Subject } from 'rxjs';
import { UserInfo } from '../type/user-info';
import { TodoTag } from '../type/todo-tag';
import { Todo } from '../type/todo';
import { StoreAction } from './store-action';
import { Box } from '../type/box';

export class AppStore {
  public todos$: Subject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public userInfo$: Subject<UserInfo> = new Subject();
  public filterTag$: BehaviorSubject<TodoTag> = new BehaviorSubject<TodoTag>(TodoTag.Doing);
  public box$: BehaviorSubject<Box[]> = new BehaviorSubject<Box[]>([]);
  public selectedTodoID$: Subject<string> = new BehaviorSubject(null);
  private storeAction: StoreAction;

  constructor() {
    this.storeAction = new StoreAction(this);
  }
}

export const appStore = new AppStore();
