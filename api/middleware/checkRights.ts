import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { User } from "@prisma/client";

const company = prisma.company;

const checkUserCompanyRights = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = Number(req.params.id);
	const { id: userId, role } = req.user as User;

	const found = await company.findUnique({
    where: { id: companyId }
  });
  if (!found) {
    return next(new ClientError('The company is not found.', 404));
  }
  if (found.userId !== userId && role !== 'admin') {
    return next(new ClientError("Forbidden action", 403));
  }
  next();
};

export { checkUserCompanyRights };

