import React, { createContext, useContext, ReactNode } from 'react';
import { Task, Category, TaskStatus } from '../types';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialTasks, initialCategories } from '../utils/initialData';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  filterCategoryId: string | null;
  setFilterCategoryId: (id: string | null) => void;
  addTask: (title: string, description: string, categoryId: string | null) => void;
  updateTask: (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  addCategory: (name: string, color: string) => void;
  updateCategory: (id: string, name: string, color: string) => void;
  deleteCategory: (id: string) => void;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export function TaskProvider({ children }: { children: ReactNode }) {
  const [tasks, setTasks] = useLocalStorage<Task[]>('taskboard-tasks', initialTasks);
  const [categories, setCategories] = useLocalStorage<Category[]>('taskboard-categories', initialCategories);
  const [filterCategoryId, setFilterCategoryId] = React.useState<string | null>(null);

  const addTask = (title: string, description: string, categoryId: string | null) => {
    const newTask: Task = {
      id: `task-${Date.now()}`,
      title,
      description,
      status: 'todo',
      categoryId,
      createdAt: Date.now(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id: string, updates: Partial<Omit<Task, 'id' | 'createdAt'>>) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, ...updates } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const moveTask = (id: string, status: TaskStatus) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: Category = {
      id: `cat-${Date.now()}`,
      name,
      color,
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, name: string, color: string) => {
    setCategories(categories.map(c => c.id === id ? { ...c, name, color } : c));
  };

  const deleteCategory = (id: string) => {
    setCategories(categories.filter(c => c.id !== id));
    setTasks(tasks.map(t => t.categoryId === id ? { ...t, categoryId: null } : t));
  };

  return (
    <TaskContext.Provider value={{
      tasks,
      categories,
      filterCategoryId,
      setFilterCategoryId,
      addTask,
      updateTask,
      deleteTask,
      moveTask,
      addCategory,
      updateCategory,
      deleteCategory,
    }}>
      {children}
    </TaskContext.Provider>
  );
}

export function useTaskContext() {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within TaskProvider');
  }
  return context;
}
