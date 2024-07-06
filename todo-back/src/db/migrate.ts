import { db } from './index';
import { sql } from 'drizzle-orm';

async function migrate() {
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS todos (
      id SERIAL PRIMARY KEY,
      title VARCHAR(256),
      completed BOOLEAN
    );
  `);

  console.log("Migration completed!");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
