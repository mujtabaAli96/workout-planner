import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

let sqlite;
let db;

try {
  // On Vercel, use in-memory database since file system is not persistent
  if (process.env.VERCEL) {
    sqlite = new Database(':memory:');
  } else {
    sqlite = new Database('./sqlite.db');
  }
  db = drizzle(sqlite, { schema });
} catch (error) {
  console.error('Error connecting to database:', error);
  // Fallback to in-memory database
  sqlite = new Database(':memory:');
  db = drizzle(sqlite, { schema });
}

export { db }; 