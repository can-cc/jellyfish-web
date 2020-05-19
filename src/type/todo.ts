export interface CreateTodoInput {
  content: string;
  deadline?: Date;
}

export interface Todo {
  id: string;
  content: string;
  detail?: string;
  status: string;
  deadline: Date;
  createdAt: Date;
  updatedAt: Date;
}
