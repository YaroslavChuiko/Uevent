import { Company, EventFormat, EventTheme } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

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
  const data: CreateEventData = req.body;
  const companyId: number = Number(req.params.id);

  //check companyId formatId themeId

  try {
    const company: Company = await prisma.company.findFirstOrThrow({
      where: {
        id: companyId,
      },
    });
  } catch (_e) {
    throw new ClientError("Your company doesn't exist!", 400);
  }

  try {
    const eventFormat: EventFormat = await prisma.eventFormat.findFirstOrThrow({
      where: {
        id: data.formatId,
      },
    });
  } catch (_e) {
    throw new ClientError("Your event format doesn't exist!", 400);
  }

  try {
    const eventTheme: EventTheme = await prisma.eventTheme.findFirstOrThrow({
      where: {
        id: data.themeId,
      },
    });
  } catch (_e) {
    throw new ClientError("Your event theme doesn't exist!", 400);
  }

  const newEvent = await prisma.event.create({
    data: {
      ...data,
      companyId,
    },
  });

  res.status(201).json(newEvent);
};

export { createEvent };
