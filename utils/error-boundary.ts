import { Request, RequestHandler, Response } from 'express';
import { NextFunction } from 'express-serve-static-core';

const boundary = (fn: RequestHandler) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    next(err);
  }
};

export default boundary;
