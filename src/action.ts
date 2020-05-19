import { appStore } from './store/store';
import axios from 'axios';
import { CreateTodoInput, Todo } from './type/todo';
import { TodoTag } from './type/todo-tag';
import { take } from 'rxjs/operators';
import { UserInfo } from './type/user-info';
import { Box, CreateBoxInput } from './type/box';
import { App } from './App';

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

  static createBox(createBoxInput: CreateBoxInput): Promise<void> {
    return axios.post<string>(`/api/box`, createBoxInput).then(() => {
      AppAction.getBoxes().then();
    });
  }

  static getBoxes(): Promise<void> {
    return axios.get<Box[]>(`/api/boxes`).then(resp => appStore.box$.next(resp.data));
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
