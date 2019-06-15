export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export class Todo {
  public id: string;
  public content: string;
  public done: boolean;
  public deadline: Date;
  public createdAt: Date;
  public updatedAt: Date;
}
