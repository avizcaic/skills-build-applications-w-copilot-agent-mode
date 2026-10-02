import User from '../models/User.js';
import { createResourceRouter } from './createResourceRouter.js';

export const usersRouter = createResourceRouter('users', User, { username: 1 });