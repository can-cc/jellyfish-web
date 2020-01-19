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
        appStore.userInfo$.next(
          UserInfo.new({
            id: resp.data.id,
            username: resp.data.username
          })
        );
      });
  }

  static createTodo(createTodoInput: CreateTodoInput): Promise<void> {
    return axios.post('/api/taco', createTodoInput).then(() => {
      AppAction.getTodos();
    });
  }

  static getTodos(): void {
    appStore.filterTag$.pipe(take(1)).subscribe((statusTag: TodoTag) => {
      let requestUrl: string;
      switch (statusTag) {
        case TodoTag.All:
          requestUrl = `/api/todos`;
          break;
        case TodoTag.Done:
          requestUrl = `/api/todos/done`;
          break;
        case TodoTag.Doing:
          requestUrl = `/api/tacos`;
          break;
      }
      if (!requestUrl || !statusTag) {
        throw new Error('Todo tag incorrect');
      }
      axios.get<Todo[]>(requestUrl).then(resp => {
        appStore.todos$.next(resp.data);
      });
    });
  }

  static updateTodo(updatedTodo: Todo): Promise<void> {
    return axios.put(`/api/todo/${updatedTodo.id}`, updatedTodo).then(() => {
      AppAction.getTodos();
    });
  }

  static updateTodoTag(todoTag: TodoTag): void {
    appStore.filterTag$.next(todoTag);
    AppAction.getTodos();
  }
}
