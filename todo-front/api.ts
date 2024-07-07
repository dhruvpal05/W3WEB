import { Todo } from "./types/tasks";
const baseUrl = process.env.NEXT_PUBLIC_API_URL;
import axios from 'axios';

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
    
    const response = await axios.post(`${baseUrl}/todos`, todo, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log(`Response status: ${response.status}`);
    
    if (response.status !== 201) {
      console.error(`Error response data: ${response.data}`);
      throw new Error(`Failed to add todo, status: ${response.status}`);
    }
    
    console.log('Response data:', response.data);
    
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.message);
      console.error('Error response data:', error.response?.data);
    } else {
      console.error('Unexpected error:', error);
    }
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
