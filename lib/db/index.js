import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema.js';

let sqlite;
let db;

try {
  sqlite = new Database('./sqlite.db');
  db = drizzle(sqlite, { schema });
} catch (error) {
  console.error('Error connecting to database:', error);
  sqlite = new Database('./sqlite.db');
  db = drizzle(sqlite, { schema });
}

export { db }; 