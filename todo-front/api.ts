import { Todo } from "./types/tasks";
const baseUrl = 'http://localhost:3001';

export const getAllTodos = async (): Promise<Todo[]> => {
  try {
    const res = await fetch(`${baseUrl}/todos`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch todos');
    return await res.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
}

export const addTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const res = await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    if (!res.ok) throw new Error('Failed to add todo');
    return await res.json();
  } catch (error) {
    console.error('Error adding todo:', error);
    throw error;
  }
}

export const editTodo = async (todo: Todo): Promise<Todo> => {
  try {
    const res = await fetch(`${baseUrl}/todos/${todo.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    if (!res.ok) throw new Error('Failed to update todo');
    return await res.json();
  } catch (error) {
    console.error('Error updating todo:', error);
    throw error;
  }
}

export const deleteTodo = async (id: string): Promise<void> => {
  try {
    const res = await fetch(`${baseUrl}/todos/${id}`, {
      method: 'DELETE'
    });
    if (!res.ok) throw new Error('Failed to delete todo');
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
}
