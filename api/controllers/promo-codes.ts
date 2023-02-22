import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { Prisma, User, UserRole } from '@prisma/client';
import { getPageOptions, getSortOptions } from '../utils/query-options';

const promoCode = prisma.promoCode;

const checkPromoCode = async (code: string, eventId: number, notId: number = 0) => {
  const exists = await promoCode.findFirst({
    where: {
      promoCode: code,
      eventId,
      NOT: {
        id: notId,
      },
    },
  });
  if (exists) {
    throw new ClientError(`This promo code for the event already exists.`, 400);
  }
};

type TQueryParams =
  | {
      id?: string | string[];
      eventId?: string;
      q?: string;
    }
  | undefined;

function getWhereOptions(queryParams: TQueryParams, user: User) {
  let where: Prisma.PromoCodeWhereInput = { AND: [] };
  if (!queryParams) {
    return where;
  }
  const { id, eventId, q } = queryParams;

  if (id) {
    let idNum = Array.isArray(id) ? id.map((item) => Number(item)) : [Number(id)];
    Array.isArray(where.AND) &&
      where.AND.push({
        id: { in: idNum },
      });
  }
  if (eventId) {
    Array.isArray(where.AND) &&
      where.AND.push({
        eventId: Number(eventId),
      });
  }
  if (q) {
    Array.isArray(where.AND) &&
      where.AND.push({
        promoCode: {
          contains: q,
        },
      });
  }

  if (user.role !== UserRole.admin) {
    where = {
      ...where,
      event: {
        company: {
          user: {
            id: user.id,
          },
        },
      },
    };
  }

  return where;
}

const getPromoCodes = async (req: Request, res: Response) => {
  const where = getWhereOptions(req.query, req.user as User);

  const [count, promoCodes] = await prisma.$transaction([
    promoCode.count({ where }),
    promoCode.findMany({
      where,
      ...getPageOptions(req.query),
      ...getSortOptions(req.query, 'id'),
    }),
  ]);

  res.header('X-Total-Count', `${count}`).json(promoCodes);
};

const getPromoCodeById = async (req: Request, res: Response) => {
  const promoCodeId = Number(req.params.id);

  const found = await promoCode.findFirst({
    where: {
      id: promoCodeId,
    },
  });
  if (!found) {
    throw new ClientError('The promo code is not found.', 404);
  }

  res.json(found);
};

const createPromoCode = async (req: Request, res: Response) => {
  const data = req.body;

  await checkPromoCode(data.promoCode, data.eventId);

  const newPromoCode = await promoCode.create({
    data,
  });

  res.status(201).json(newPromoCode);
};

const updatePromoCode = async (req: Request, res: Response) => {
  const data = req.body;
  const promoCodeId = Number(req.params.id);

  if (data.promoCode) {
    const found = await promoCode.findFirst({
      where: {
        id: promoCodeId,
      },
    });
    if (!found) {
      throw new ClientError('The promo code is not found.', 404);
    }
    await checkPromoCode(data.promoCode, found.eventId, promoCodeId);
  }

  const updatedPromoCode = await promoCode.update({
    where: {
      id: promoCodeId,
    },
    data,
  });

  res.status(201).json(updatedPromoCode);
};

const deletePromoCode = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await promoCode.delete({
    where: { id },
  });

  res.json({ id });
};

export { getPromoCodes, getPromoCodeById, createPromoCode, updatePromoCode, deletePromoCode };
