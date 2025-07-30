import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI('AIzaSyB0dGh3JUE9-n3RAkkPgfqEVs2RsqExfns');
// const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const workoutPlanPrompt = `You are a professional fitness trainer and workout plan creator. Create a detailed, structured workout plan based on the user's request.

IMPORTANT: You must respond with ONLY a valid JSON object in the exact format specified below. Do not include any other text, explanations, or markdown formatting.

JSON Schema:
{
  "programName": "string - The name of the workout program",
  "programDescription": "string - A brief description of the program",
  "weeks": [
    {
      "week": "number - Week number (1, 2, 3, etc.)",
      "days": [
        {
          "day": "number - Day number within the week (1, 2, 3, etc.)",
          "title": "string - Day title (e.g., 'Upper Body', 'Lower Body', 'Rest')",
          "exercises": [
            {
              "circuit": "string - Circuit letter (A, B, C, D, E, etc.)",
              "exerciseName": "string - Name of the exercise",
              "sets": "number - Number of sets",
              "reps": "string - Rep range (e.g., '12, 10, 8' or '8-12')",
              "rest": "string - Rest time (e.g., '90s', '2min')",
              "notes": "string - Additional notes or instructions"
            }
          ]
        }
      ]
    }
  ]
}

Guidelines for creating workout plans:
1. Create realistic, progressive workout plans
2. Include appropriate rest days
3. Use proper exercise names and terminology
4. Provide specific rep ranges, sets, and rest periods
5. Include helpful notes for form and technique
6. Make sure exercises are appropriate for the user's level and goals
7. For rest days, include an empty exercises array
8. Use circuit letters (A, B, C, D, E) to organize exercises logically

User Request: `;

export async function generateWorkoutPlan(userPrompt) {
  try {
    const model = genAI.getGenerativeModel({model: "gemini-2.5-flash" });
    
    const prompt = workoutPlanPrompt + userPrompt;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Invalid JSON response from AI');
    }
    
    const workoutPlan = JSON.parse(jsonMatch[0]);
    
    if (!workoutPlan.programName || !workoutPlan.weeks || !Array.isArray(workoutPlan.weeks)) {
      throw new Error('Invalid workout plan structure');
    }
    
    return workoutPlan;
  } catch (error) {
    console.error('Error generating workout plan:', error);
    throw new Error('Failed to generate workout plan');
  }
} 