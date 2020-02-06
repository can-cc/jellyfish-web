export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export class Todo {
  public id: string;
  public content: string;
  public detail?: string;
  public status: string;
  public deadline: Date;
  public createdAt: Date;
  public updatedAt: Date;
}
