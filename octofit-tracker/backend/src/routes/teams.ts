import Team from '../models/Team.js';
import { createResourceRouter } from './createResourceRouter.js';

export const teamsRouter = createResourceRouter('teams', Team, { name: 1 });