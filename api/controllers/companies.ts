import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { User, Prisma } from '@prisma/client';
import { getPageOptions, getSortOptions } from '../utils/query-options';
import Avatar from '../services/avatar';
import CompanyService from '../services/company';
import stripe from '../lib/stripe';

const company = prisma.company;

const checkFor = async (key: string, value: string, notId: number = 0) => {
  const exists = await company.findFirst({
    where: {
      [key]: value,
      NOT: {
        id: notId,
      },
    },
  });
  if (exists) {
    throw new ClientError(`The company with this ${key} already exists.`, 400);
  }
};

type TQueryParams =
  | {
      id?: string | string[];
      creatorId?: string;
      subscriberId?: string;
      q?: string;
    }
  | undefined;

function getWhereOptions(queryParams: TQueryParams) {
  const where: Prisma.CompanyWhereInput = { AND: [] };
  if (!queryParams) {
    return where;
  }
  const { id, creatorId, subscriberId, q } = queryParams;

  const numToArr = (id: string | string[]) =>
    Array.isArray(id) ? id.map((item) => Number(item)) : [Number(id)];

  if (id) {
    let idNum = numToArr(id);
    Array.isArray(where.AND) &&
      where.AND.push({
        id: { in: idNum },
      });
  }
  if (creatorId) {
    Array.isArray(where.AND) &&
      where.AND.push({
        userId: Number(creatorId),
      });
  }
  if (subscriberId) {
    Array.isArray(where.AND) &&
      where.AND.push({
        subscribers: {
          some: {
            userId: Number(subscriberId),
          },
        },
      });
  }
  if (q) {
    Array.isArray(where.AND) &&
      where.AND.push({
        OR: [
          {
            name: {
              contains: q,
            },
          },
          {
            email: {
              contains: q,
            },
          },
        ],
      });
  }
  return where;
}

const getCompanies = async (req: Request, res: Response) => {
  const where = getWhereOptions(req.query);

  const [count, companies] = await prisma.$transaction([
    company.count({ where }),
    company.findMany({
      where,
      ...getPageOptions(req.query),
      ...getSortOptions(req.query, 'id'),
    }),
  ]);

  res.header('X-Total-Count', `${count}`).json(companies);
};

const getCompanyById = async (req: Request, res: Response) => {
  const companyId = Number(req.params.id);

  const found = await CompanyService.findOneOrThrow(companyId);
  const isAccountCompleted = !found.stripeId
    ? null
    : await CompanyService.isAccountValid(found.stripeId);

  res.json({ ...found, isAccountCompleted });
};

const createCompany = async (req: Request, res: Response) => {
  const data = req.body;
  const { id: userId } = req.user as User;

  await checkFor('name', data.name);
  await checkFor('email', data.email);

  const newCompany = await company.create({
    data: {
      ...data,
      userId,
    },
  });

  res.status(201).json(newCompany);
};

const updateCompany = async (req: Request, res: Response) => {
  const data = req.body;
  const companyId = Number(req.params.id);

  if (data.name) {
    await checkFor('name', data.name, companyId);
  }
  if (data.email) {
    await checkFor('email', data.email, companyId);
  }

  const updatedCompany = await CompanyService.update(companyId, data);

  res.status(201).json(updatedCompany);
};

const deleteCompany = async (req: Request, res: Response) => {
  const companyId = Number(req.params.id);

  await CompanyService.predelete(companyId);

  await company.delete({
    where: { id: companyId },
  });

  res.status(204).send();
};

const updateAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ClientError('Please provide a valid file.', 400);
  }

  const companyId = Number(req.params.id);

  const toUpdate = await company.findUnique({ where: { id: companyId } });
  await Avatar.removeFrom(toUpdate);

  const updatedCompany = await company.update({
    where: {
      id: companyId,
    },
    data: {
      picturePath: req.file.filename,
    },
  });

  res.status(201).json(updatedCompany);
};

const deleteAvatar = async (req: Request, res: Response) => {
  const companyId = Number(req.params.id);

  const toUpdate = await company.findUnique({ where: { id: companyId } });
  await Avatar.removeFrom(toUpdate);

  const updatedCompany = await company.update({
    where: {
      id: companyId,
    },
    data: {
      picturePath: null,
    },
  });

  res.status(201).json(updatedCompany);
};

export {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
  updateAvatar,
  deleteAvatar,
};
