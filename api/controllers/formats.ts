import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from "../types/error";
import { Prisma } from "@prisma/client";
import { getPageOptions, getSortOptions } from '../utils/query-options';

const format = prisma.eventFormat;
const event = prisma.event;

const checkFormatName = async (name: string) => {
  const exists = await format.findFirst({ 
    where: { 
      name
    }
  });
  if (exists) {
    throw new ClientError(`This format name already exists.`, 400);
  }
};

type TQueryParams = {
  id?: string | string[];
  q?: string;
} | undefined;

function getWhereOptions(queryParams: TQueryParams) {
  let where: Prisma.EventFormatWhereInput = { AND: [] };
  if (!queryParams) {
    return where;
  }
  const { id, q } = queryParams;

  if (id) {
    let idNum = Array.isArray(id) ? id.map((item) => Number(item)) : [Number(id)];
    Array.isArray(where.AND) && where.AND.push({
      id: { in: idNum },
    });
  }
  if (q) {
    Array.isArray(where.AND) && where.AND.push({
      name: {
				contains: q
			}
    });
  }
  return where;
}

const getFormats = async (req: Request, res: Response) => {
	const where = getWhereOptions(req.query);

  const [count, formats] = await prisma.$transaction([
    format.count({ where }),
    format.findMany({
      where,
      ...getPageOptions(req.query),
      ...getSortOptions(req.query, 'id')
    }),
  ]);

  res.header("X-Total-Count", `${count}`).json(formats);
};

const getFormatById = async (req: Request, res: Response) => {
  const formatId = Number(req.params.id);

  const found = await format.findFirst({
  	where: {
      id: formatId
    }
  });
  if (!found) {
    throw new ClientError('The format is not found.', 404);
  }

  res.json(found);
};

const createFormat = async (req: Request, res: Response) => {
	const name = req.body.name;

	await checkFormatName(name);

	const newFormat = await format.create({
    data: {
      name
    },
  });
	
	res.status(201).json(newFormat);
};

const updateFormat = async (req: Request, res: Response) => {
	const name = req.body.name;
  const formatId = Number(req.params.id);

	await checkFormatName(name);

	const updatedFormat = await format.update({
    where: {
      id: formatId
    },
    data: {
      name
    }
  });

  res.status(201).json(updatedFormat);
};

const deleteFormat = async (req: Request, res: Response) => {
  const formatId = Number(req.params.id);

  const foundEvent = await event.findFirst({
    where: {
      formatId
    },
  });
  if (foundEvent) {
    throw new ClientError('There are events using this format, so you can not delete it.', 403);
  }

  await format.delete({
    where: { id: formatId },
  });

  res.status(204).send();
};

export { getFormats, getFormatById, createFormat, updateFormat, deleteFormat };

