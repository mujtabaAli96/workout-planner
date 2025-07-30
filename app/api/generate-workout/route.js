import { NextResponse } from 'next/server';
import { generateWorkoutPlan } from '@/lib/gemini';
import { db } from '@/lib/db';
import { workoutPlans, weeks, days, exercises } from '@/lib/db/schema';
import { nanoid } from 'nanoid';

export async function GET() {
  return NextResponse.json(
    { 
      message: 'This endpoint only accepts POST requests. Please use the application to generate workout plans.',
      method: 'POST',
      body: { prompt: 'string - Your workout plan description' }
    },
    { status: 405 }
  );
}

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json(
        { error: 'Prompt is required and must be a string' },
        { status: 400 }
      );
    }

    const workoutPlanData = await generateWorkoutPlan(prompt);
    const workoutPlanId = nanoid();

    await db.insert(workoutPlans).values({
      id: workoutPlanId,
      programName: workoutPlanData.programName,
      programDescription: workoutPlanData.programDescription,
    });

    for (const weekData of workoutPlanData.weeks) {
      const weekId = nanoid();
      
      await db.insert(weeks).values({
        id: weekId,
        workoutPlanId,
        weekNumber: weekData.week,
      });

      for (const dayData of weekData.days) {
        const dayId = nanoid();
        
        await db.insert(days).values({
          id: dayId,
          weekId,
          dayNumber: dayData.day,
          title: dayData.title,
        });

        for (let i = 0; i < dayData.exercises.length; i++) {
          const exercise = dayData.exercises[i];
          await db.insert(exercises).values({
            id: nanoid(),
            dayId,
            circuit: exercise.circuit,
            exerciseName: exercise.exerciseName,
            sets: exercise.sets,
            reps: exercise.reps,
            rest: exercise.rest,
            notes: exercise.notes,
            order: i,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      workoutPlanId,
      workoutPlan: workoutPlanData,
    });

  } catch (error) {
    console.error('Error in generate-workout API:', error);
    return NextResponse.json(
      { error: 'Failed to generate workout plan' },
      { status: 500 }
    );
  }
} 