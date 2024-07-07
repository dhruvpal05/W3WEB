import { Todo } from "./types/tasks";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;

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
    console.log(`Making request to: ${baseUrl}/todos`);
    console.log(`Request body: ${JSON.stringify(todo)}`);
    
    const res = await fetch(`${baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(todo)
    });
    
    console.log(`Response status: ${res.status}`);
    
    if (!res.ok) {
      const errorText = await res.text();
      console.error(`Error response text: ${errorText}`);
      throw new Error(`Failed to add todo, status: ${res.status}`);
    }
    
    const data = await res.json();
    console.log('Response data:', data);
    
    return data;
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
