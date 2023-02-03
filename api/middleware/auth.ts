import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { Token } from '../services';

const user = prisma.user;

const auth = async (req: Request, _res: Response, next: NextFunction) => {
  const header = req.headers.authorization;
  const token = header && header.split(' ')[1];

  const data = Token.validate(token);
  if (!data || typeof data === "string" || !data.id) {
    return next(new ClientError('The access token is invalid or has expired.', 401));
  }

  const found = await user.findUnique({
    where: { id: data.id }
  });
  if (!found) {
    return next(new ClientError('The access token is invalid or has expired.', 401));
  }
  req.user = found;
  next();
};

export default auth;

