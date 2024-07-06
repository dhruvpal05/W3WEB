import { Hono } from 'hono';
import { db } from './db';
import { todos } from './db/schema';
import { sql } from 'drizzle-orm';

const app = new Hono();

// Get all ToDo items
app.get('/todos', async (c) => {
  const result = await db.select().from(todos).execute();
  return c.json(result);
});

// Get a single ToDo item by ID
app.get('/todos/:id', async (c) => {
  const id = c.req.param('id');
  const result = await db.select().from(todos).where(sql`${todos.id} = ${id}`).execute();
  if (result.length === 0) {
    return c.json({ error: 'ToDo not found' }, 404);
  }
  return c.json(result[0]);
});

// Create a new ToDo item
app.post('/todos', async (c) => {
  const body = await c.req.json();
  const newToDo = await db.insert(todos).values({
    title: body.title,
    completed: body.completed ?? false,
  }).execute();
  return c.json(newToDo, 201);
});

// Update a ToDo item by ID
app.put('/todos/:id', async (c) => {
  const id = c.req.param('id');
  const body = await c.req.json();
  const updatedToDo = await db.update(todos)
    .set({
      title: body.title,
      completed: body.completed,
    })
    .where(sql`${todos.id} = ${id}`)
    .execute();
  return c.json(updatedToDo);
});

// Delete a ToDo item by ID
app.delete('/todos/:id', async (c) => {
  const id = c.req.param('id');
  await db.delete(todos).where(sql`${todos.id} = ${id}`).execute();
  return c.json({ message: 'ToDo deleted' });
});

// Export the app for usage in index.ts
export default app;
