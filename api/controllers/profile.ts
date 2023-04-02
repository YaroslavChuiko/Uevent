import { User } from '@prisma/client';
import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import Avatar from '../services/avatar';
import CompanyService from '../services/company';
import UserService from '../services/user';
import ClientError from '../types/error';
import fileUpload from '../utils/file-upload';

const user = prisma.user;
const company = prisma.company;

const getProfile = async (req: Request, res: Response) => {
  const { password, isConfirmed, ...rest } = req.user as User;

  res.json(rest);
};

const updateProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;
  const data = req.body;

  await UserService.update(id, data);

  res.sendStatus(204);
};

const deleteProfile = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  await Avatar.removeFromUserById(id);

  const companies = await company.findMany({ where: { userId: id } });
  await Promise.all(companies.map((c) => CompanyService.predelete(c.id)));

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

  await UserService.updateAvatar(id, picturePath);

  res.json({ picturePath });
};

const deleteUserAvatar = async (req: Request, res: Response) => {
  const { id } = req.user as User;

  await UserService.deleteAvatar(id);

  res.sendStatus(204);
};

export {
  getProfile,
  updateProfile,
  deleteProfile,
  uploadPhoto,
  updateUserAvatar,
  deleteUserAvatar,
};
