import { Company, User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

interface UserRequest extends Request {
  user: User;
}

//? mb del this type
type CreateEventData = {
  name: string;
  description: string;
  price: number;
  location: string;
  ticketsLimit: number;
  isNotificationsOn: boolean;
  isPublic: boolean;
  date: string;
  publishDate: string;
  formatId: number;
  themeId: number;
};

const createEvent = async (req: Request, res: Response) => {
  const data: CreateEventData = req.body as CreateEventData;
  const companyId: number = Number(req.params.id);
  // const { id: userId } = (req as UserRequest).user;
  const userId = 1;

  await checkCompany(companyId, userId);
  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const newEvent = await prisma.event.create({ data: { ...data, companyId } });

  res.status(201).json(newEvent);
};

const checkCompany = async (companyId: number, ownerId: number) => {
  const company: Company = await findCompanyIfExist(companyId);

  checkCompanyOwner(company, ownerId);
};

const findCompanyIfExist = async (companyId: number) => {
  let company: Company;

  try {
    company = await prisma.company.findUniqueOrThrow({ where: { id: companyId } });
  } catch (_e) {
    throw new ClientError("Your company doesn't exist!", 400);
  }

  return company;
};

const checkCompanyOwner = (company: Company, ownerId: number): void => {
  if (company && company.userId !== ownerId) {
    throw new ClientError("You aren't owner of this company!", 400);
  }
};

const checkUniqueEventName = async (name: string) => {
  const exists = await prisma.event.findUnique({ where: { name } });
  if (exists) {
    throw new ClientError('The event with this name already exists.', 400);
  }
};

//! two same functions mb try to optimize them
const checkEventFormatExists = async (formatId: number) => {
  try {
    await prisma.eventFormat.findUniqueOrThrow({ where: { id: formatId } });
  } catch (_e) {
    throw new ClientError("The event format doesn't exist!", 400);
  }
};

const checkEventThemeExists = async (themeId: number) => {
  try {
    await prisma.eventTheme.findUniqueOrThrow({ where: { id: themeId } });
  } catch (_e) {
    throw new ClientError("The event theme doesn't exist!", 400);
  }
};

export { createEvent };
