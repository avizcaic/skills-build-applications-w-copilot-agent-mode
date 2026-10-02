import { Workout } from '../models/octofitModels.js';
import { createResourceRouter } from './createResourceRouter.js';

export const workoutsRouter = createResourceRouter('workouts', Workout, { difficulty: 1, title: 1 });