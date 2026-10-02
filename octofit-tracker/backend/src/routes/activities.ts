import { Activity } from '../models/octofitModels.js';
import { createResourceRouter } from './createResourceRouter.js';

export const activitiesRouter = createResourceRouter('activities', Activity, { completedAt: -1 });