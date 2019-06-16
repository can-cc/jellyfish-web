import store, { AppStore } from './store/store';
import axios from 'axios';
import { CreateTodoInput, Todo } from './model/todo';
import { TodoTag } from './model/todo-tag';
import { take } from 'rxjs/operators';

export class AppAction {
  static getUserInfo() {
    const userId = window.localStorage.getItem('userId');

    axios
      .get<{
        avatarUrl: string;
        username: string;
      }>(`/api/user/${userId}`)
      .then(resp => {
        store.userInfo$.next({
          avatarUrl: resp.data.avatarUrl,
          username: resp.data.username
        });
      });
  }

  static createTodo(createTodoInput: CreateTodoInput): Promise<void> {
    return axios.post('/api/todo', createTodoInput).then(() => {
      AppAction.getTodos();
    });
  }

  static getTodos(): void {
    AppStore.filterTag$.pipe(take(1)).subscribe((statusTag: TodoTag) => {
      let requestUrl: string;
      switch (statusTag) {
        case TodoTag.All:
          requestUrl = `/api/todos`;
          break;
        case TodoTag.Done:
          requestUrl = `/api/todos/done`;
          break;
        case TodoTag.Doing:
          requestUrl = `/api/todos/doing`;
          break;
      }
      if (!requestUrl) {
        throw new Error('Todo tag incorrect');
      }
      axios.get<Todo[]>(requestUrl).then(resp => {
        AppStore.todos$.next(resp.data);
      });
    });
  }

  static updateTodo(updatedTodo: Todo): Promise<void> {
    return axios.put(`/api/todo/${updatedTodo.id}`, updatedTodo).then(() => {
      AppAction.getTodos();
    });
  }

  static updateTodoTag(todoTag: TodoTag): void {
    store.filterTag$.next(todoTag);
    AppAction.getTodos();
  }
}
