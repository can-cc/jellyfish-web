import { runInAction, observable, action, computed } from 'mobx';
import axios from 'axios';

const LIMIT = 10;

export class TodoStore {
  @observable isLoading = false;
  todosRegistry = observable.map({});

  @computed get todos() {
    return this.todosRegistry.values();
  }

  clear() {
    this.todosRegistry.clear();
  }

  getTodo(id) {
    return this.todosRegistry.get(id);
  }

  @action
  loadTodos(userId: string) {
    this.isLoading = true;
    return axios
      .get(`/api/auth/todo?userId=${userId}`)
      .then(
        action("fetchSuccess", resp => {
          console.log(resp);
          /* this.todosRegistry.clear(); */
          let i = 0;
          resp.data.forEach(todo => {
            console.log(todo);
            runInAction(() => {
              this.todosRegistry.set(i++, observable.map(todo));
              window.todo = this.todosRegistry
            })
          });
        })
      )
  }

  @action
  createTodo(todo) {
    axios.post('/api/todo', { content: this.state.value }).then(
      action(() => {
        this.loadTodos();
      })
    );
  }

  @action
  updateTodo(todo) {
    return axios.put(`/api/todo/${todo.id}`, todo).then(({ todo }) => {
      return todo;
    });
  }
}

export default new TodoStore();
