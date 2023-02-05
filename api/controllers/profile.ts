import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import fileUpload from '../utils/file-upload';

const user = prisma.user;

type FileType = Express.Multer.File;

const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const data = req.body;

  await user.update({ where: { id }, data });

  res.sendStatus(204);
};

const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  await user.delete({ where: { id } });

  res.sendStatus(204);
};

const uploadPhoto = fileUpload.single('avatar');

const updateUserAvatar = async (req: Request, res: Response) => {
  const picturePath = (req.file as FileType).filename;
  const { id } = req.user as User;

  await user.update({ data: { picturePath }, where: { id } });

  res.sendStatus(204);
};

export { updateProfile, deleteProfile, uploadPhoto, updateUserAvatar };
