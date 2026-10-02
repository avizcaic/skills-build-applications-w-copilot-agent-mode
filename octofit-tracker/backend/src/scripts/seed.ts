import mongoose from 'mongoose';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const teams = [
  {
    name: 'Blue Barracudas',
    city: 'Seattle',
    coach: 'Maya Chen',
    memberCount: 4,
    weeklyGoalMinutes: 1200,
  },
  {
    name: 'Crimson Cyclones',
    city: 'Austin',
    coach: 'Jordan Patel',
    memberCount: 4,
    weeklyGoalMinutes: 1100,
  },
  {
    name: 'Golden Griffins',
    city: 'Denver',
    coach: 'Sam Rivera',
    memberCount: 4,
    weeklyGoalMinutes: 1250,
  },
];

const users = [
  {
    username: 'alex-runner',
    displayName: 'Alex Morgan',
    email: 'alex.morgan@example.com',
    team: 'Blue Barracudas',
    role: 'captain',
    age: 29,
    fitnessGoal: 'Improve 10K race pace',
  },
  {
    username: 'priya-lifts',
    displayName: 'Priya Singh',
    email: 'priya.singh@example.com',
    team: 'Crimson Cyclones',
    role: 'member',
    age: 34,
    fitnessGoal: 'Build strength and mobility',
  },
  {
    username: 'marco-hiit',
    displayName: 'Marco Rossi',
    email: 'marco.rossi@example.com',
    team: 'Golden Griffins',
    role: 'member',
    age: 26,
    fitnessGoal: 'Increase weekly active minutes',
  },
  {
    username: 'taylor-trails',
    displayName: 'Taylor Kim',
    email: 'taylor.kim@example.com',
    team: 'Blue Barracudas',
    role: 'member',
    age: 31,
    fitnessGoal: 'Train for a trail half marathon',
  },
];

const activities = [
  {
    username: 'alex-runner',
    team: 'Blue Barracudas',
    activityType: 'Run',
    durationMinutes: 52,
    caloriesBurned: 610,
    completedAt: new Date('2026-09-28T13:30:00Z'),
  },
  {
    username: 'priya-lifts',
    team: 'Crimson Cyclones',
    activityType: 'Strength Training',
    durationMinutes: 45,
    caloriesBurned: 380,
    completedAt: new Date('2026-09-29T18:15:00Z'),
  },
  {
    username: 'marco-hiit',
    team: 'Golden Griffins',
    activityType: 'HIIT',
    durationMinutes: 32,
    caloriesBurned: 430,
    completedAt: new Date('2026-09-30T12:00:00Z'),
  },
  {
    username: 'taylor-trails',
    team: 'Blue Barracudas',
    activityType: 'Cycling',
    durationMinutes: 68,
    caloriesBurned: 720,
    completedAt: new Date('2026-10-01T15:45:00Z'),
  },
];

const leaderboardEntries = [
  {
    username: 'taylor-trails',
    team: 'Blue Barracudas',
    rank: 1,
    points: 2480,
    activeMinutes: 410,
  },
  {
    username: 'alex-runner',
    team: 'Blue Barracudas',
    rank: 2,
    points: 2315,
    activeMinutes: 385,
  },
  {
    username: 'marco-hiit',
    team: 'Golden Griffins',
    rank: 3,
    points: 2140,
    activeMinutes: 340,
  },
  {
    username: 'priya-lifts',
    team: 'Crimson Cyclones',
    rank: 4,
    points: 1985,
    activeMinutes: 315,
  },
];

const workouts = [
  {
    title: 'Tempo Builder Run',
    focusArea: 'Cardio',
    difficulty: 'Intermediate',
    durationMinutes: 40,
    exercises: ['Warm-up jog', 'Tempo intervals', 'Cooldown walk'],
    recommendedFor: 'Improve 10K race pace',
  },
  {
    title: 'Foundational Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 35,
    exercises: ['Goblet squats', 'Incline push-ups', 'Dumbbell rows', 'Plank holds'],
    recommendedFor: 'Build strength and mobility',
  },
  {
    title: 'Trail Endurance Session',
    focusArea: 'Endurance',
    difficulty: 'Advanced',
    durationMinutes: 55,
    exercises: ['Hill repeats', 'Single-leg deadlifts', 'Step-ups', 'Mobility flow'],
    recommendedFor: 'Train for a trail half marathon',
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await Team.insertMany(teams);
    await User.insertMany(users);
    await Activity.insertMany(activities);
    await Leaderboard.insertMany(leaderboardEntries);
    await Workout.insertMany(workouts);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
