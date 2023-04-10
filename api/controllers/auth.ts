import { Request, Response } from 'express';
import { COOKIE_OPTIONS } from '../consts/default';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { hashPassword, comparePasswords } from '../utils/password';
import { Token, ConfirmPayload, Email } from '../services';
import templates from '../consts/email';
import UserService from '../services/user';

const user = prisma.user;

const generateUserTokens = ({ id, email, login }: ConfirmPayload) => {
  const accessToken = Token.generate({ id, email, login });
  const refreshToken = Token.generate({ id }, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const register = async (req: Request, res: Response) => {
  const data = req.body;

  const { id } = await UserService.create(data);

  res.json({ id });
};

const confirmEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  const data = Token.validate(token);
  if (!data || typeof data === 'string' || !data.id) {
    throw new ClientError('The confirm token is invalid or has expired.', 403);
  }

  const found = await user.findUnique({ where: { id: data.id } });
  if (!found) {
    throw new ClientError('The confirm token is invalid or has expired.', 403);
  }

  await user.update({
    where: { id: Number(data.id) },
    data: { isConfirmed: true },
  });

  res.status(200).send();
};

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const found = await user.findUnique({ where: { login } });
  if (!found) {
    throw new ClientError('Wrong login and/or password.', 400);
  }

  const isAuthorized = await comparePasswords(password, found.password);
  if (!isAuthorized) {
    throw new ClientError('Wrong login and/or password.', 400);
  }

  if (!found.isConfirmed) {
    throw new ClientError('Please confirm your email.', 403);
  }

  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  const { password: p, ...toSend } = found;
  res.json({
    accessToken,
    ...toSend,
  });
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.cookies;

  const data = Token.validate(token);
  if (!data || typeof data === 'string' || !data.id) {
    throw new ClientError('The refresh token is invalid.', 403);
  }

  const found = await user.findUnique({ where: { id: data.id } });
  if (!found) {
    throw new ClientError('No user found', 404);
  }
  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
};

const logout = (_req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

const sendPasswordConfirmation = async (req: Request, res: Response) => {
  const { email } = req.body;

  const found = await user.findUnique({ where: { email } });
  if (!found) {
    throw new ClientError('No user with this email found', 404);
  }
  const { id, login } = found;

  const token = Token.generateConfirmToken({ id });
  await Email.sendMail(email, templates.PASSWORD_CONFIRM, { login, token });

  res.status(200).send();
};

const resetPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  let { password } = req.body;

  const data = Token.validate(token);
  if (!data || typeof data === 'string' || !data.id) {
    throw new ClientError('The confirm token is invalid or has expired.', 403);
  }

  const found = await user.findUnique({ where: { id: data.id } });
  if (!found) {
    throw new ClientError('The confirm token is invalid or has expired.', 403);
  }

  password = await hashPassword(password);
  await user.update({
    where: { id: Number(data.id) },
    data: { password },
  });

  res.status(200).send();
};

export { register, confirmEmail, login, refresh, logout, sendPasswordConfirmation, resetPassword };
