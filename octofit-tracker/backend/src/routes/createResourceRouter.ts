import { Router } from 'express';
import type { Model } from 'mongoose';

export function createResourceRouter<T>(resourceName: string, model: Model<T>, sort: Record<string, 1 | -1> = {}) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const data = await model.find().sort(sort).lean();

      response.status(200).json({ resource: resourceName, data });
    } catch (error) {
      next(error);
    }
  });

  return router;
}