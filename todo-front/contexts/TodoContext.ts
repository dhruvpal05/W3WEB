"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

export interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

interface TodoContextType {
  todos: Todo[];
  addTodo: (todo: Todo) => void;
  updateTodo: (id: string, updatedTodo: Partial<Todo>) => void;
  deleteTodo: (id: string) => void;
}

export const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (todo: Todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (id: string, updatedTodo: Partial<Todo>) => {
    setTodos(todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo)));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

};
