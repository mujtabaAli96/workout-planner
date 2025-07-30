'use client';

import { useState, useEffect } from 'react';
import { ArrowRight, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import LoadingSpinner from '@/components/LoadingSpinner';

export default function PromptView({ onGenerateWorkout }) {
  const [prompt, setPrompt] = useState('Program Name: Full Body Strength and Conditioning Program Description: This 6-day full body workout program is designed to enhance overall strength, build muscle, and improve cardiovascular fitness. It targets all major muscle groups throughout the week, ensuring balanced development and conditioning.');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const initDatabase = async () => {
      try {
        await fetch('/api/setup-db', { method: 'POST' });
      } catch (error) {
        console.error('Failed to initialize database:', error);
      }
    };
    
    initDatabase();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || isLoading) return;

    setIsLoading(true);
    try {
      const response = await fetch('/api/generate-workout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: prompt.trim() }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate workout plan');
      }

      const data = await response.json();
      onGenerateWorkout(data.workoutPlanId, data.workoutPlan);
    } catch (error) {
      console.error('Error generating workout plan:', error);
      alert('Failed to generate workout plan. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Smarter training starts here
          </h1>
          <p className="text-lg text-gray-600">
            Chat with AI to build custom fitness plans
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe what are we building today..."
                className="w-full h-32 p-4 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#6367EF] focus:border-transparent"
                maxLength={1000}
                disabled={isLoading}
                style={{ color: 'black' }}
              />
              
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  {prompt.length}/1000
                </span>
                
                <Button
                  type="submit"
                  disabled={!prompt.trim() || isLoading}
                  className="bg-[#6367EF] hover:bg-[#8b8fff] text-white rounded-full w-12 h-12 p-0 flex items-center justify-center"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" className="text-white" />
                  ) : (
                    <ArrowRight className="w-5 h-5" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
} 