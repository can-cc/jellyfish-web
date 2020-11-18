import { appStore } from './store';
import axios from 'axios';
import { CreateTodoInput, Todo } from '../type/todo';
import { TodoStatus } from '../type/todo-status';
import { take } from 'rxjs/operators';
import { UserInfo } from '../type/user-info';
import { Box, CreateBoxInput } from '../type/box';
import { combineLatest } from 'rxjs';

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
    return axios.get<Box[]>(`/api/boxes`).then(resp => appStore.boxes$.next(resp.data));
  }

  static getTodos(): void {
    combineLatest(appStore.statusFilter$, appStore.selectedBoxId$)
      .pipe(take(1))
      .subscribe(([statusTag, boxId]) => {
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
              status: statusParams,
              box: boxId
            }
          })
          .then(resp => {
            appStore.addTodoList$.next(
              resp.data.map(t => ({
                ...t,
                createdAt: new Date(t.createdAt),
                updatedAt: new Date(t.updatedAt)
              }))
            );
            appStore.currentTodoIds$.next(resp.data.map(t => t.id));
          });
      });
  }

  static updateTodo(updatedTodo: Todo): Promise<void> {
    if (!updatedTodo.boxId) {
      updatedTodo.boxId = undefined;
    }
    appStore.updateTodo$.next(updatedTodo);
    return axios.put(`/api/taco/${updatedTodo.id}`, updatedTodo).then(() => {});
  }

  static sortTodo({ boxId, todoId, targetTodoId, isBefore }): Promise<void> {
    return axios.post(`/api/taco/resort`, {
      tacoId: todoId,
      targetTacoId: targetTodoId,
      boxId
    });
  }

  static updateTodoTag(todoTag: TodoStatus): void {
    appStore.statusFilter$.next(todoTag);
  }

  static selectTodo(todoID: string) {
    appStore.selectedTodoId$.next(todoID);
  }

  static selectBox(boxId: string) {
    appStore.selectedBoxId$.next(boxId);
  }

  static deleteTodo(todo: Todo) {
    return axios.delete(`/api/taco/${todo.id}`).then(() => {
      AppAction.getTodos();
    });
  }
}
