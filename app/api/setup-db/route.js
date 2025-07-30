import { NextResponse } from 'next/server';
import Database from 'better-sqlite3';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import * as schema from '@/lib/db/schema.js';

export async function POST() {
  try {
    const sqlite = new Database('./sqlite.db');
    const db = drizzle(sqlite, { schema });

    const createTablesSQL = `
      CREATE TABLE IF NOT EXISTS "workout_plans" (
        "id" text PRIMARY KEY NOT NULL,
        "program_name" text NOT NULL,
        "program_description" text NOT NULL,
        "created_at" integer NOT NULL
      );

      CREATE TABLE IF NOT EXISTS "weeks" (
        "id" text PRIMARY KEY NOT NULL,
        "workout_plan_id" text NOT NULL,
        "week_number" integer NOT NULL,
        FOREIGN KEY ("workout_plan_id") REFERENCES "workout_plans"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "days" (
        "id" text PRIMARY KEY NOT NULL,
        "week_id" text NOT NULL,
        "day_number" integer NOT NULL,
        "title" text NOT NULL,
        FOREIGN KEY ("week_id") REFERENCES "weeks"("id") ON DELETE CASCADE
      );

      CREATE TABLE IF NOT EXISTS "exercises" (
        "id" text PRIMARY KEY NOT NULL,
        "day_id" text NOT NULL,
        "circuit" text NOT NULL,
        "exercise_name" text NOT NULL,
        "sets" integer NOT NULL,
        "reps" text NOT NULL,
        "rest" text NOT NULL,
        "notes" text NOT NULL,
        "order" integer NOT NULL,
        FOREIGN KEY ("day_id") REFERENCES "days"("id") ON DELETE CASCADE
      );
    `;

    sqlite.exec(createTablesSQL);
    sqlite.close();

    return NextResponse.json({
      success: true,
      message: 'Database initialized successfully'
    });

  } catch (error) {
    console.error('Error setting up database:', error);
    return NextResponse.json(
      { error: 'Failed to setup database' },
      { status: 500 }
    );
  }
} 