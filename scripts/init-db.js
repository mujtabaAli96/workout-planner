import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '../lib/db/schema.js';

// Create the database file
const sqlite = new Database('./sqlite.db');
const db = drizzle(sqlite, { schema });

// Read and execute the migration
import { readFileSync } from 'fs';
import { join } from 'path';

try {
  const migrationPath = join(process.cwd(), 'drizzle', '0000_initial.sql');
  const migration = readFileSync(migrationPath, 'utf8');
  
  // Execute the migration
  sqlite.exec(migration);
  
  console.log('✅ Database initialized successfully!');
  console.log('📊 Tables created: workout_plans, weeks, days, exercises');
} catch (error) {
  console.error('❌ Error initializing database:', error);
  process.exit(1);
} finally {
  sqlite.close();
} 