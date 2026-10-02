import { Team } from '../models/octofitModels.js';
import { createResourceRouter } from './createResourceRouter.js';

export const teamsRouter = createResourceRouter('teams', Team, { name: 1 });