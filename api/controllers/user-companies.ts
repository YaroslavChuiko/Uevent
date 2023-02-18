import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

const company = prisma.company;
const userCompanies = prisma.subscriptionToCompany;

const findCompanyOrThrow = async (id: number) => {
  const exists = await company.findUnique({ where: { id } });
  if (!exists) {
    throw new ClientError('This company does not exist', 404);
  }
};

const isCompanyConnected = async (companyId: number, userId: number) => {
  const found = await userCompanies.findUnique({
    where: {
      userId_companyId: { companyId, userId },
    },
  });
  return found !== null;
};

const subscribeToCompany = async (req: Request, res: Response) => {
  const { id: userId } = req.user as User;
  const companyId = Number(req.params.id);

  await findCompanyOrThrow(companyId);

  if (await isCompanyConnected(companyId, userId)) {
    throw new ClientError('You are already subscribed to this company', 400);
  }

  await company.update({
    where: { id: companyId },
    data: {
      subscribers: {
        create: { userId },
      },
    },
  });

  res.json({ companyId });
};

const unsubscribeFromCompany = async (req: Request, res: Response) => {
  const { id: userId } = req.user as User;
  const companyId = Number(req.params.id);

  await findCompanyOrThrow(companyId);

  if (!(await isCompanyConnected(companyId, userId))) {
    throw new ClientError('You are not subscribed to this company', 400);
  }

  await userCompanies.delete({
    where: { userId_companyId: { userId, companyId } },
  });

  res.sendStatus(204);
};

export { subscribeToCompany, unsubscribeFromCompany };
