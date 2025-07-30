'use client';

import { useState } from 'react';
import PromptView from '@/components/PromptView';
import WorkoutPlanView from '@/components/WorkoutPlanView';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const [currentView, setCurrentView] = useState('prompt');
  const [workoutPlan, setWorkoutPlan] = useState(null);
  const [workoutPlanId, setWorkoutPlanId] = useState(null);

  const handleGenerateWorkout = (id, plan) => {
    setWorkoutPlanId(id);
    setWorkoutPlan(plan);
    setCurrentView('workout');
  };

  const handleBackToPrompt = () => {
    setCurrentView('prompt');
    setWorkoutPlan(null);
    setWorkoutPlanId(null);
  };

  return (
    <ErrorBoundary>
      <div>
        {currentView === 'prompt' ? (
          <PromptView onGenerateWorkout={handleGenerateWorkout} />
        ) : (
          <WorkoutPlanView 
            workoutPlan={workoutPlan} 
            onBack={handleBackToPrompt} 
          />
        )}
      </div>
    </ErrorBoundary>
  );
}
