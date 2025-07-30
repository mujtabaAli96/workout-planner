import { sqliteTable, text, integer, real } from 'drizzle-orm/sqlite-core';

export const workoutPlans = sqliteTable('workout_plans', {
  id: text('id').primaryKey(),
  programName: text('program_name').notNull(),
  programDescription: text('program_description').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull().$defaultFn(() => new Date()),
});

export const weeks = sqliteTable('weeks', {
  id: text('id').primaryKey(),
  workoutPlanId: text('workout_plan_id').notNull().references(() => workoutPlans.id, { onDelete: 'cascade' }),
  weekNumber: integer('week_number').notNull(),
});

export const days = sqliteTable('days', {
  id: text('id').primaryKey(),
  weekId: text('week_id').notNull().references(() => weeks.id, { onDelete: 'cascade' }),
  dayNumber: integer('day_number').notNull(),
  title: text('title').notNull(),
});

export const exercises = sqliteTable('exercises', {
  id: text('id').primaryKey(),
  dayId: text('day_id').notNull().references(() => days.id, { onDelete: 'cascade' }),
  circuit: text('circuit').notNull(),
  exerciseName: text('exercise_name').notNull(),
  sets: integer('sets').notNull(),
  reps: text('reps').notNull(),
  rest: text('rest').notNull(),
  notes: text('notes').notNull(),
  order: integer('order').notNull(),
}); 