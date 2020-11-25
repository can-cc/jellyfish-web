export interface CreateBoxInput {
  name: string;
}

export interface Box {
  id: string;
  name: string;
}

export enum TodoType {
  Task = 'Task',
}