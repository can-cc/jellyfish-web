import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { UserInfo } from '../model/user-info';
import { TodoTag } from '../model/todo-tag';
import { Todo } from '../model/todo';
import { StoreAction } from './store-action';

export class AppStore {
  public todos$: Subject<Todo[]> = new BehaviorSubject<Todo[]>([]);
  public userInfo$: Subject<UserInfo> = new Subject();
  public userAvatar$: Subject<string> = new Subject();
  public filterTag$: BehaviorSubject<TodoTag> = new BehaviorSubject<TodoTag>(TodoTag.Doing);
  public selectedTodoID$: Subject<string> = new BehaviorSubject(null);
  private storeAction: StoreAction;

  constructor() {
    this.storeAction = new StoreAction(this);
  }
}

export const appStore = new AppStore();
