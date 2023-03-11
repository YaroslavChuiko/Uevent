import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { Token } from '../services';
import { IncomingHttpHeaders } from 'http';

const user = prisma.user;

const authorizeUserOrThrow = async (headers: IncomingHttpHeaders) => {
  const header = headers.authorization;
  const token = header && header.split(' ')[1];

  const data = Token.validate(token);
  if (!data || typeof data === 'string' || !data.id) {
    throw new ClientError('The access token is invalid or has expired.', 401);
  }

  const found = await user.findUnique({
    where: { id: data.id },
  });
  if (!found) {
    throw new ClientError('The access token is invalid or has expired.', 401);
  }

  return found;
};

const auth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.user = await authorizeUserOrThrow(req.headers);
    next();
  } catch (err) {
    return next(err);
  }
};

const optionalAuth = async (req: Request, _res: Response, next: NextFunction) => {
  try {
    req.user = await authorizeUserOrThrow(req.headers);
    next();
  } catch (err) {
    if (err as ClientError) {
      return next();
    }
    next(err);
  }
};

export default auth;
export { optionalAuth };
