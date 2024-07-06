import { boolean } from "drizzle-orm/pg-core";
import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";


export const todos = pgTable('todos', {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 256 }),
    completed: boolean('completed'),
});