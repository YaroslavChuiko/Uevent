import { Request, Response } from 'express';
import prisma from '../lib/prisma';

const users = prisma.user;

export const getTest = async (_req: Request, res: Response) => {
  const data = await users.findMany();

  res.json({ data });
};
