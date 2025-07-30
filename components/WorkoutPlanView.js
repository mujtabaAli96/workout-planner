'use client';

import { useState } from 'react';
import { ArrowLeft, Edit, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import Logo from '@/components/Logo';

export default function WorkoutPlanView({ workoutPlan, onBack }) {
  const [selectedWeek, setSelectedWeek] = useState(0);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  if (!workoutPlan || !workoutPlan.weeks || workoutPlan.weeks.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">No workout plan available</p>
          <Button onClick={onBack} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Prompt
          </Button>
        </div>
      </div>
    );
  }

  const currentWeek = workoutPlan.weeks[selectedWeek];

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortExercises = (exercises) => {
    if (!sortConfig.key) return exercises;

    return [...exercises].sort((a, b) => {
      let aValue = a[sortConfig.key];
      let bValue = b[sortConfig.key];

      if (sortConfig.key === 'sets') {
        aValue = parseInt(aValue);
        bValue = parseInt(bValue);
      }

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <Logo />
        </div>
        <div className='px-6'>
          <div className="mt-4">
            <Tabs value={selectedWeek.toString()} onValueChange={(value) => setSelectedWeek(parseInt(value))}>
              <TabsList className="bg-gray-100 text-black">
                {workoutPlan.weeks.map((week, index) => (
                  <TabsTrigger
                    key={week.id}
                    value={index.toString()}
                    className="data-[state=active]:bg-[#6367EF] data-[state=active]:text-white cursor-pointer"
                  >
                    Week {week.week}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-white">
            {currentWeek.days.map((day) => (
              <div key={day.id} className="border-b border-gray-100 last:border-b-0">
                <div className={` ${day.exercises.length > 0 ? 'bg-[#CBCDEB]' : 'bg-[#E2E2E2]'} px-6 py-3 mt-4 rounded-md`}>
                  <h3 className="font-semibold text-gray-900">
                    Day {day.day} - {day.title}
                  </h3>
                </div>

                {day.exercises.length > 0 ? (
                  <div className="overflow-x-auto  ">
                    <table className="w-full bg-white">
                      <thead>
                        <tr className={`border-b border-gray-100 ${day.exercises.length > 0 ? 'bg-[#F9FAFB]' : 'bg-white'}`}>
                          <th 
                            className="text-left px-6 py-3 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort('circuit')}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Circuits</span>
                              {sortConfig.key === 'circuit' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </th>
                          <th 
                            className="text-left px-6 py-3 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort('exerciseName')}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Exercise</span>
                              {sortConfig.key === 'exerciseName' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </th>
                          <th 
                            className="text-left px-6 py-3 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort('sets')}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Sets</span>
                              {sortConfig.key === 'sets' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </th>
                          <th 
                            className="text-left px-6 py-3 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort('reps')}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Reps</span>
                              {sortConfig.key === 'reps' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </th>
                          <th 
                            className="text-left px-6 py-3 text-sm font-medium text-gray-500 cursor-pointer hover:bg-gray-100 select-none"
                            onClick={() => handleSort('notes')}
                          >
                            <div className="flex items-center space-x-1">
                              <span>Notes</span>
                              {sortConfig.key === 'notes' && (
                                sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                              )}
                            </div>
                          </th>
                          <th className="text-left px-6 py-3 text-sm font-medium text-gray-500">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="pt-4">
                        {sortExercises(day.exercises).map((exercise) => (
                          <tr key={exercise.id} className="hover:bg-gray-50 rounded-lg shadow-sm border border-gray-100 my-4">
                            <td className="px-6 py-4 text-sm font-medium text-gray-900">
                              {exercise.circuit}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {exercise.exerciseName}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {exercise.sets}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                              {exercise.reps}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-600">
                              {exercise.notes}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex space-x-2">
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-red-600 hover:text-red-700">
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 