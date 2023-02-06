import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { User, UserRole } from "@prisma/client";

const company = prisma.company;
const comment = prisma.comment;

const checkUserCompanyRights = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = Number(req.params.id);
	const { id: userId, role } = req.user as User;

	const found = await company.findUnique({
    where: { id: companyId }
  });
  if (!found) {
    return next(new ClientError('The company is not found.', 404));
  }
  if (found.userId !== userId && role !== UserRole.admin) {
    return next(new ClientError("Forbidden action", 403));
  }
  next();
};

const checkUserCommentRights = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.id);
	const { id: userId, role } = req.user as User;

	const found = await comment.findUnique({
    where: { id: commentId }
  });
  if (!found) {
    return next(new ClientError('The comment is not found.', 404));
  }
  if (found.userId !== userId && role !== UserRole.admin) {
    return next(new ClientError("Forbidden action", 403));
  }
  next();
};

export { checkUserCompanyRights, checkUserCommentRights };

