import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { workoutPlans, weeks, days, exercises } from '@/lib/db/schema';
import { eq, inArray } from 'drizzle-orm';

export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: 'Workout plan ID is required' },
        { status: 400 }
      );
    }

    // Get the workout plan
    const [workoutPlan] = await db
      .select()
      .from(workoutPlans)
      .where(eq(workoutPlans.id, id));

    if (!workoutPlan) {
      return NextResponse.json(
        { error: 'Workout plan not found' },
        { status: 404 }
      );
    }

    // Get all weeks for this workout plan
    const weeksData = await db
      .select()
      .from(weeks)
      .where(eq(weeks.workoutPlanId, id))
      .orderBy(weeks.weekNumber);

    // Get all days for all weeks
    const weekIds = weeksData.map(week => week.id);
    const daysData = await db
      .select()
      .from(days)
      .where(inArray(days.weekId, weekIds))
      .orderBy(days.dayNumber);

    // Get all exercises for all days
    const dayIds = daysData.map(day => day.id);
    const exercisesData = await db
      .select()
      .from(exercises)
      .where(inArray(exercises.dayId, dayIds))
      .orderBy(exercises.order);

    // Structure the data
    const structuredWorkoutPlan = {
      id: workoutPlan.id,
      programName: workoutPlan.programName,
      programDescription: workoutPlan.programDescription,
      createdAt: workoutPlan.createdAt,
      weeks: weeksData.map(week => {
        const weekDays = daysData.filter(day => day.weekId === week.id);
        return {
          id: week.id,
          week: week.weekNumber,
          days: weekDays.map(day => {
            const dayExercises = exercisesData
              .filter(exercise => exercise.dayId === day.id)
              .map(exercise => ({
                id: exercise.id,
                circuit: exercise.circuit,
                exerciseName: exercise.exerciseName,
                sets: exercise.sets,
                reps: exercise.reps,
                rest: exercise.rest,
                notes: exercise.notes,
              }));
            
            return {
              id: day.id,
              day: day.dayNumber,
              title: day.title,
              exercises: dayExercises,
            };
          }),
        };
      }),
    };

    return NextResponse.json(structuredWorkoutPlan);

  } catch (error) {
    console.error('Error fetching workout plan:', error);
    return NextResponse.json(
      { error: 'Failed to fetch workout plan' },
      { status: 500 }
    );
  }
} 