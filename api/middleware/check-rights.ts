import { NextFunction, Request, Response } from 'express';
import ClientError from '../types/error';
import prisma from '../lib/prisma';
import { User, UserRole } from '@prisma/client';

const company = prisma.company;
const event = prisma.event;
const comment = prisma.comment;
const promoCode = prisma.promoCode;

const checkUserCompanyRights = async (req: Request, res: Response, next: NextFunction) => {
  const companyId = req.body.companyId || Number(req.params.id);
  const { id: userId, role } = req.user as User;

  const found = await company.findUnique({
    where: { id: companyId },
  });
  if (!found) {
    return next(new ClientError('The company is not found.', 404));
  }
  if (found.userId !== userId && role !== UserRole.admin) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

const checkUserEventRights = async (req: Request, res: Response, next: NextFunction) => {
  const eventId = req.body.eventId || Number(req.params.id);
  const { id: userId, role } = req.user as User;

  let found = await event.findUnique({
    where: { id: eventId },
  });
  if (!found) {
    return next(new ClientError('The event is not found.', 404));
  }
  if (role !== UserRole.admin) {
    found = await event.findFirst({
      where: {
        id: eventId,
        company: {
          user: {
            id: userId,
          },
        },
      },
    });
    if (!found) {
      return next(new ClientError('Forbidden action', 403));
    }
  }
  next();
};

const checkUserCommentRights = async (req: Request, res: Response, next: NextFunction) => {
  const commentId = Number(req.params.id);
  const { id: userId, role } = req.user as User;

  const found = await comment.findUnique({
    where: { id: commentId },
  });
  if (!found) {
    return next(new ClientError('The comment is not found.', 404));
  }
  if (found.userId !== userId && role !== UserRole.admin) {
    return next(new ClientError('Forbidden action', 403));
  }
  next();
};

const checkUserPromoCodeRights = async (req: Request, res: Response, next: NextFunction) => {
  const promoCodeId = Number(req.params.id);
  const { id: userId, role } = req.user as User;

  let found = await promoCode.findUnique({
    where: { id: promoCodeId },
  });
  if (!found) {
    return next(new ClientError('The promo code is not found.', 404));
  }
  if (role !== UserRole.admin) {
    found = await promoCode.findFirst({
      where: {
        id: promoCodeId,
        event: {
          company: {
            user: {
              id: userId,
            },
          },
        },
      },
    });
    if (!found) {
      return next(new ClientError('Forbidden action', 403));
    }
  }
  next();
};

export {
  checkUserCompanyRights,
  checkUserEventRights,
  checkUserCommentRights,
  checkUserPromoCodeRights,
};
