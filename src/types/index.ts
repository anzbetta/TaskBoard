export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  categoryId: string | null;
  createdAt: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
