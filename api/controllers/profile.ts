import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import Avatar from '../services/avatar';
import UserService from '../services/user';
import ClientError from '../types/error';
import fileUpload from '../utils/file-upload';

const user = prisma.user;

const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const data = req.body;

  await UserService.update(id, data);

  res.sendStatus(204);
};

const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  await Avatar.removeFromUserById(id);

  await user.delete({ where: { id } });

  res.sendStatus(204);
};

const uploadPhoto = fileUpload.single('avatar');

const updateUserAvatar = async (req: Request, res: Response) => {
  if (!req.file) {
    throw new ClientError('Please provide a valid file.', 400);
  }

  const picturePath = req.file.filename;
  const { id } = req.user as User;

  const toUpdate = await user.findUnique({ where: { id } });
  await Avatar.removeFrom(toUpdate);

  await user.update({ data: { picturePath }, where: { id } });

  res.sendStatus(204);
};

const deleteUserAvatar = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  const toUpdate = await user.findUnique({ where: { id } });
  await Avatar.removeFrom(toUpdate);

  await user.update({ data: { picturePath: null }, where: { id } });

  res.sendStatus(204);
};

export { updateProfile, deleteProfile, uploadPhoto, updateUserAvatar, deleteUserAvatar };
