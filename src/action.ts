import store from './store/store';
import axios from 'axios';
import { CreateTodoInput, Todo } from './model/todo';

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
    const userId = window.localStorage.getItem('userId');
    axios.get(`/api/todo?userId=${userId}`).then(resp => {
      resp.data.forEach((todo: Todo) => {
        store.todoAdd$.next(todo);
      });
    });
  }
  static updateTodo(updatedTodo: Todo): Promise<void> {
    return axios.put(`/api/todo/${updatedTodo.id}`, updatedTodo).then(() => {
      AppAction.getTodos();
    });
  } 
}
