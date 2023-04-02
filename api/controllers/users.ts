import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import UserService from '../services/user';
import ClientError from '../types/error';
import { getPageOptions, getSortOptions } from '../utils/query-options';
import Avatar from '../services/avatar';
import wait from '../utils/wait';
import CompanyService from '../services/company';

const user = prisma.user;
const company = prisma.company;

const createUser = async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = await UserService.create(data);

  res.status(201).json({ id });
};

const getMany = async (req: Request, res: Response) => {
  const pagination = getPageOptions(req.query);
  const sort = getSortOptions(req.query, 'login');
  const { where, isViewAllowed } = await UserService.getWhereOptions(req.query, req.user?.id);

  if (!isViewAllowed) {
    return res.header('X-Total-Count', '-1').json(null);
  }

  const [users, count] = await prisma.$transaction([
    user.findMany({
      ...pagination,
      ...sort,
      where,
    }),
    user.count({ where }),
  ]);

  const result = users.map(({ password, ...obj }) => obj);

  res.setHeader('X-Total-Count', count);
  res.json(result);
};

const getUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  const found = await user.findUnique({ where: { id } });
  if (!found) {
    throw new ClientError('This user does not exist', 404);
  }
  const { password, ...toSend } = found;

  await wait(2000);

  res.json(toSend);
};

const updateUser = async (req: Request, res: Response) => {
  const data = req.body;
  const id = Number(req.params.id);

  await UserService.findOrThrow(id);

  await UserService.update(id, data);

  res.json({ id });
};

const deleteUser = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await UserService.findOrThrow(id);

  await Avatar.removeFromUserById(id);

  const companies = await company.findMany({ where: { userId: id } });
  await Promise.all(companies.map((c) => CompanyService.predelete(c.id)));

  await user.delete({ where: { id } });

  res.json({ id });
};

const updateUserAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ClientError('Please provide a valid file.', 400);
  }

  const picturePath = req.file.filename;
  const id = Number(req.params.id);

  await UserService.updateAvatar(id, picturePath);

  res.sendStatus(204);
};

const deleteUserAvatar = async (req: Request, res: Response) => {
  const id = Number(req.params.id);

  await UserService.deleteAvatar(id);

  res.sendStatus(204);
};

export { getMany, createUser, getUser, updateUser, deleteUser, updateUserAvatar, deleteUserAvatar };
