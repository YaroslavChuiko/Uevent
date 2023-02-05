import { UserRole } from '@prisma/client';
import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';

// Admin auth middleware (note: should be called only after auth middleware,
// otherwise, an exception will be thrown)
const adminAuth = async (req: Request, _res: Response, next: NextFunction) => {
  if (!req.user) {
    return next(new ClientError('You need to authenticate as a user first.', 403));
  }

  const savedUser = req.user;

  if (savedUser.role !== UserRole.admin) {
    return next(new ClientError('This action is only available for admins.', 403));
  }
  next();
};

export default adminAuth;
