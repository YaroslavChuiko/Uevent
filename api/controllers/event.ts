import { Company, Event, User } from '@prisma/client';
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

const getOneEventById = async (req: Request, res: Response) => {
  const eventId: number = Number(req.params.id);

  const event: Event = await findEventIfExist(eventId);

  res.status(200).json(event);
};

// duplicate
const findEventIfExist = async (id: number) => {
  let event: Event;

  try {
    event = await prisma.event.findUniqueOrThrow({
      where: { id },
      include: { format: true, theme: true }, //! not sure about what needs to include
    });
  } catch (_e) {
    throw new ClientError("The event doesn't exist!", 400);
  }

  return event;
};

const getManyEvents = async (req: Request, res: Response) => {
  const where = buildWhereOption(req.query);
  const pagination = buildPaginationOption(req.query);
  const sorting = buildSortingOption(req.query);

  const events: Event[] = await prisma.event.findMany({
    ...where,
    ...pagination,
    ...sorting,
    include: { format: true, theme: true },
  });

  const countEvents: number = await prisma.event.count({ ...where });

  res.setHeader('X-Total-Count', countEvents);
  res.setHeader('Access-Control-Expose-Headers', 'X-Total-Count');
  res.status(200).json(events);
};

const buildWhereOption = (queryParams: any) => {
  const format = convertQueryParamToNumArr(queryParams.format);
  const theme = convertQueryParamToNumArr(queryParams.theme);

  return buildWhereOptionFromAttributes({ format, theme });
};

const convertQueryParamToNumArr = (param: string): number[] => {
  let arr: number[] = [];

  if (param) {
    arr = param.split(',').map((item) => Number(item));
  }

  return arr;
};

type WhereOptionAttributes = {
  format: number[];
  theme: number[];
};

const buildWhereOptionFromAttributes = (attributes: WhereOptionAttributes) => {
  const option = { where: {} };

  for (const key in attributes) {
    (option.where as any)[`${key}Id`] = { in: (attributes as any)[key] };
  }

  return option;
};

const buildPaginationOption = (queryParams: any) => {
  const limit = Number(queryParams.limit);
  const cursor = Number(queryParams.cursor);

  // first request without cursor
  if (cursor) {
    return {
      take: limit,
      skip: 1,
      cursor: {
        id: cursor,
      },
    };
  }

  return {
    take: limit,
  };
};

const buildSortingOption = (queryParams: any): any => {
  // doesn't work without :any
  const sort = (queryParams.sort as string) || 'id';
  const order = (queryParams.order as string) || 'asc';

  // sort by properties of a relation
  if (sort === 'format' || sort === 'theme') {
    return {
      orderBy: {
        [sort]: {
          name: order.toLowerCase(),
        },
      },
    };
  }

  return {
    orderBy: {
      [sort]: order.toLowerCase(),
    },
  };
};

const updateEvent = async (req: Request, res: Response) => {
  const data: CreateEventData = req.body as CreateEventData;
  const companyId = Number(req.params.companyId);
  const eventId = Number(req.params.eventId);
  // const { id: userId } = (req as UserRequest).user;
  const userId = 1;

  await checkCompany(companyId, userId);
  await checkUniqueEventName(data.name);
  await checkEventFormatExists(data.formatId);
  await checkEventThemeExists(data.themeId);

  const updatedEvent = await prisma.event.update({
    where: { id: eventId },
    data: { ...data },
  });

  res.json(updatedEvent);
};

export { createEvent, getOneEventById, getManyEvents, updateEvent };
