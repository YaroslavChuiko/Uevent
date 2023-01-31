import { NextFunction, Request, Response } from 'express';
import logger from '../lib/logger';
import ClientError from '../types/error';

const errorMiddleware = (
  error: Error | ClientError,
  _req: Request,
  res: Response,
  _next?: NextFunction,
) => {
  logger.error(error);
  res.status((error as ClientError).status || 500).json({
    message: error.message || 'A server-side error occurred.',
  });
};

export default errorMiddleware;
