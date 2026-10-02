import Workout from '../models/Workout.js';
import { createResourceRouter } from './createResourceRouter.js';

export const workoutsRouter = createResourceRouter('workouts', Workout, { difficulty: 1, title: 1 });