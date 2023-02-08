import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import ClientError from "../types/error";
import { Prisma } from "@prisma/client";
import { getPageOptions, getSortOptions } from '../utils/query-options';

const theme = prisma.eventTheme;
const event = prisma.event;

const checkThemeName = async (name: string) => {
  const exists = await theme.findFirst({ 
    where: { 
      name
    }
  });
  if (exists) {
    throw new ClientError(`This theme name already exists.`, 400);
  }
};

type TQueryParams = {
  id?: string | string[];
  q?: string;
} | undefined;

function getWhereOptions(queryParams: TQueryParams) {
  let where: Prisma.EventThemeWhereInput = { AND: [] };
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

const getThemes = async (req: Request, res: Response) => {
	const where = getWhereOptions(req.query);

  const [count, themes] = await prisma.$transaction([
    theme.count({ where }),
    theme.findMany({
      where,
      ...getPageOptions(req.query),
      ...getSortOptions(req.query, 'id')
    }),
  ]);

  res.header("X-Total-Count", `${count}`).json(themes);
};

const getThemeById = async (req: Request, res: Response) => {
  const themeId = Number(req.params.id);

  const found = await theme.findFirst({
  	where: {
      id: themeId
    }
  });
  if (!found) {
    throw new ClientError('The theme is not found.', 404);
  }

  res.json(found);
};

const createTheme = async (req: Request, res: Response) => {
	const name = req.body.name;

	await checkThemeName(name);

	const newTheme = await theme.create({
    data: {
      name
    },
  });
	
	res.status(201).json(newTheme);
};

const updateTheme = async (req: Request, res: Response) => {
	const name = req.body.name;
  const themeId = Number(req.params.id);

	await checkThemeName(name);

	const updatedTheme = await theme.update({
    where: {
      id: themeId
    },
    data: {
      name
    }
  });

  res.status(201).json(updatedTheme);
};

const deleteTheme = async (req: Request, res: Response) => {
  const themeId = Number(req.params.id);

  const foundEvent = await event.findFirst({
    where: {
      themeId
    },
  });
  if (foundEvent) {
    throw new ClientError('There are events using this theme, so you can not delete it.', 403);
  }

  await theme.delete({
    where: { id: themeId },
  });

  res.status(204).send();
};

export { getThemes, getThemeById, createTheme, updateTheme, deleteTheme };

