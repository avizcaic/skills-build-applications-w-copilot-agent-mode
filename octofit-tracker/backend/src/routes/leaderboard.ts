import { LeaderboardEntry } from '../models/octofitModels.js';
import { createResourceRouter } from './createResourceRouter.js';

export const leaderboardRouter = createResourceRouter('leaderboard', LeaderboardEntry, { rank: 1 });