import { observable, action, computed } from 'mobx';
import agent from '../agent';
import axios from 'axios';

const LIMIT = 10;

export class TodoStore {
  @observable isLoading = false;
  @observable todosRegistry = observable.map();

  @computed
  get todos() {
    return this.todosRegistry.values();
  }

  clear() {
    this.todosRegistry.clear();
  }

  getTodo(id) {
    return this.todosRegistry.get(id);
  }

  @action
  loadTodos() {
    this.isLoading = true;
    axios
      .get(`/api/auth/todo?userId=${userId}`)
      .then(
        action(resp => {
          this.todosRegistry.clear();
          resp.data.forEach(todo => this.todosRegistry.set(todo.id, todo));
          return resp.data;
        })
      )
      .finally(() => {
        action(() => {
          this.isLoading = false;
        });
      });
  }

  @action
  loadArticle(slug, { acceptCached = false } = {}) {
    if (acceptCached) {
      const article = this.getArticle(slug);
      if (article) return Promise.resolve(article);
    }
    this.isLoading = true;
    return agent.Articles.get(slug)
      .then(
        action(({ article }) => {
          this.articlesRegistry.set(article.slug, article);
          return article;
        })
      )
      .finally(
        action(() => {
          this.isLoading = false;
        })
      );
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
    return agent.Articles.update(data).then(({ article }) => {
      this.articlesRegistry.set(article.slug, article);
      return article;
    });
  }
}

export default new TodoStore();
