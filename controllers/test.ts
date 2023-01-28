import { Request, Response } from 'express';

export const getTest = (_req: Request, res: Response) => {
  res.json('This is a test.');
};
