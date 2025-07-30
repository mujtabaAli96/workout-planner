# Maxed - AI Workout Planner

An AI-powered workout plan generator built with Next.js, Drizzle ORM, and Google's Gemini AI.

## Features

- 🤖 AI-powered workout plan generation using Gemini
- 📊 Structured workout plans with weeks, days, and exercises
- 🎨 Clean, modern UI matching the provided designs
- 💾 Database persistence with Drizzle ORM
- 📱 Responsive design
- ⚡ Fast development with Next.js 15

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: SQLite with Drizzle ORM
- **AI**: Google Gemini AI
- **UI Components**: Radix UI, Lucide React icons

## Prerequisites

- Node.js 18+ 
- Google Gemini API key

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd workout-planner
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

4. **Set up the database**
   ```bash
   npm run db:generate
   npm run db:migrate
   ```

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Getting a Gemini API Key

1. Go to [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the API key and add it to your `.env.local` file

## Usage

### Prompt View
- Enter a description of the workout plan you want
- Examples:
  - "A 6-week full-body strength and conditioning program for an intermediate lifter"
  - "A 4-week beginner-friendly cardio and strength program"
  - "A 12-week advanced powerlifting program"

### Workout Plan View
- View the generated workout plan organized by weeks
- Navigate between weeks using the tabs
- Each day shows exercises with sets, reps, and notes
- Edit and delete functionality (UI only - not implemented)

## Project Structure

```
workout-planner/
├── app/
│   ├── api/
│   │   ├── generate-workout/route.js    # AI workout generation
│   │   └── workout-plans/[id]/route.js  # Fetch workout plans
│   ├── layout.js                        # Root layout
│   └── page.js                          # Main page
├── components/
│   ├── ui/                              # Reusable UI components
│   ├── PromptView.js                    # Input form component
│   └── WorkoutPlanView.js               # Workout display component
├── lib/
│   ├── db/                              # Database configuration
│   ├── gemini.js                        # AI service
│   └── utils.js                         # Utility functions
└── drizzle/                             # Database migrations
```

## API Endpoints

### POST /api/generate-workout
Generates a new workout plan using AI.

**Request:**
```json
{
  "prompt": "A 6-week full-body strength program"
}
```

**Response:**
```json
{
  "success": true,
  "workoutPlanId": "unique_id",
  "workoutPlan": {
    "programName": "Full Body Strength Program",
    "programDescription": "...",
    "weeks": [...]
  }
}
```

### GET /api/workout-plans/[id]
Fetches a specific workout plan by ID.

## Database Schema

The application uses a relational database with the following tables:
- `workout_plans` - Main workout program information
- `weeks` - Week information for each program
- `days` - Day information for each week
- `exercises` - Exercise details for each day

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run db:generate` - Generate database migrations
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Drizzle Studio

### Adding New Features

1. **Database Changes**: Update schema in `lib/db/schema.js`
2. **API Routes**: Add new routes in `app/api/`
3. **UI Components**: Create components in `components/`
4. **Styling**: Use Tailwind CSS classes

## Deployment

The application can be deployed to Vercel, Netlify, or any other Next.js-compatible platform.

1. **Environment Variables**: Set `GEMINI_API_KEY` in your deployment platform
2. **Database**: The SQLite database will be created automatically
3. **Build**: The application will build automatically

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.
