import Leaderboard from '../models/Leaderboard.js';
import { createResourceRouter } from './createResourceRouter.js';

export const leaderboardRouter = createResourceRouter('leaderboard', Leaderboard, { rank: 1 });