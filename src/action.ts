import { appStore } from './store/store';
import axios from 'axios';
import { CreateTodoInput, Todo } from './model/todo';
import { TodoTag } from './model/todo-tag';
import { take } from 'rxjs/operators';
import { UserInfo } from './model/user-info';

export class AppAction {
  static getUserInfo() {
    axios
      .get<{
        id: string;
        username: string;
      }>(`/api/user/me`)
      .then(resp => {
        appStore.userInfo$.next(UserInfo.new(resp.data));
      });
  }

  static createTodo(createTodoInput: CreateTodoInput): Promise<void> {
    return axios.post('/api/taco', createTodoInput);
  }

  static getTodos(): void {
    appStore.filterTag$.pipe(take(1)).subscribe((statusTag: TodoTag) => {
      let statusParams;
      switch (statusTag) {
        case 'Doing':
        case 'Done': {
          statusParams = statusTag;
          break;
        }
        case 'All':
        default:
          statusParams = 'Done,Doing';
      }
      axios
        .get<Todo[]>(`/api/tacos`, {
          params: {
            status: statusParams
          }
        })
        .then(resp => {
          appStore.todos$.next(
            resp.data.map(t => ({
              ...t,
              createdAt: new Date(t.createdAt),
              updatedAt: new Date(t.updatedAt)
            }))
          );
        });
    });
  }

  static updateTodo(updatedTodo: Todo): Promise<void> {
    return axios.put(`/api/taco/${updatedTodo.id}`, updatedTodo).then(() => {
      AppAction.getTodos();
    });
  }

  static updateTodoTag(todoTag: TodoTag): void {
    appStore.filterTag$.next(todoTag);
  }

  static selectTodo(todoID: string) {
    appStore.selectedTodoID$.next(todoID);
  }
}
