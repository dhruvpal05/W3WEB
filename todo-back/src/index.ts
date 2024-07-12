import { Hono } from 'hono';
import { z } from 'zod';
import { db } from './db';
import { todos } from './db/schema';
import { sql } from 'drizzle-orm';
import { cors } from 'hono/cors';

const app = new Hono();

// Enable CORS for all routes
app.use(
  '*',
  cors({
    origin: ['https://w3-web.vercel.app','http://localhost:3000'],
    allowHeaders: ['Content-Type'],
    allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
  })
);

// app.use(
//   '*',
//   cors({
//     origin: 'http://localhost:3000',
//     allowHeaders: ['Content-Type'],
//     allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
//   })
// );

// Log middleware execution for debugging
app.use('*', (c, next) => {
  console.log('CORS middleware executed');
  return next();
});

const createToDoSchema = z.object({
  title: z.string().min(1, "Title is required"),
  completed: z.boolean().optional(),
});

// Get all ToDo items
app.get('/todos', async (c) => {
  try {
    const result = await db.select().from(todos).execute();
    return c.json(result);
  } catch (error) {
    return c.json({ error: 'Failed to fetch ToDo items' }, 500);
  }
});

// Get a single ToDo item by ID
app.get('/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const result = await db.select().from(todos).where(sql`${todos.id} = ${id}`).execute();
    if (result.length === 0) {
      return c.json({ error: 'ToDo not found' }, 404);
    }
    return c.json(result[0]);
  } catch (error) {
    return c.json({ error: 'Failed to fetch ToDo item' }, 500);
  }
});

// Create a new ToDo item
app.post('/todos', async (c) => {
  try {
    const body = await c.req.json();
    console.log('Received body:', body);
    const parsed = createToDoSchema.safeParse(body);

    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const newToDo = await db.insert(todos).values({
      title: parsed.data.title,
      completed: parsed.data.completed ?? false,
    }).execute();

    return c.json(newToDo, 201);
  } catch (error) {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

// Update a ToDo item by ID
app.put('/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    const body = await c.req.json();
    console.log('Received body:', body);
    const parsed = createToDoSchema.partial().safeParse(body);

    if (!parsed.success) {
      return c.json({ error: parsed.error.errors }, 400);
    }

    const updatedToDo = await db.update(todos)
      .set(parsed.data)
      .where(sql`${todos.id} = ${id}`)
      .execute();

    return c.json(updatedToDo);
  } catch (error) {
    return c.json({ error: 'Invalid JSON' }, 400);
  }
});

// Delete a ToDo item by ID
app.delete('/todos/:id', async (c) => {
  try {
    const id = c.req.param('id');
    await db.delete(todos).where(sql`${todos.id} = ${id}`).execute();
    return c.json({ message: 'ToDo deleted' });
  } catch (error) {
    return c.json({ error: 'Failed to delete ToDo item' }, 500);
  }
});

// Export the app for usage in index.ts
export default {
  port: 3001,
  fetch: app.fetch,
}

console.log('Server running on port 3001');
