import { Request, Response } from 'express';
import { COOKIE_OPTIONS } from '../consts/default';
import prisma from '../lib/prisma';
import ClientError from "../types/error";
import { hashPassword, comparePasswords } from '../utils/password';
import { Token, ConfirmPayload, Factory, Email } from '../services';
import templates from '../consts/email';

const user = prisma.user;

const checkFor = async (key: string, value: string) => {
  const exists = await user.findUnique({ where: { [key]: value } });
  if (exists) {
    throw new ClientError(`The user with this ${key} already exists.`, 400);
  }
};

const generateUserTokens = ({ id, email, login }: ConfirmPayload) => {
  const accessToken = Token.generate({ id, email, login });
  const refreshToken = Token.generate({ id }, { expiresIn: '7d' });
  return { accessToken, refreshToken };
};

const register = async (req: Request, res: Response) => {
  const data = req.body;

  await checkFor('login', data.login);
  await checkFor('email', data.email);

  data.password = await hashPassword(data.password);

  const { id } = await Factory.create(user, data);
  const { email, login } = data;
  const token = Token.generateConfirmToken({ id });
  await Email.sendMail(email, templates.EMAIL_CONFIRM, { login, token });

  res.json({ id });
};

const confirmEmail = async (req: Request, res: Response) => {
  const { token } = req.params;
  const data = Token.validate(token);
  if (!data || typeof data === "string" || !data.id) {
    throw new ClientError('The confirm token is invalid or has expired.', 401);
  }

  try {
    await Factory.exists(user, { id: data.id });
  } catch (_e) {
    throw new ClientError('The confirm token is invalid or has expired.', 401);
  }

  await Factory.update(user, data.id, { isConfirmed: true });

  res.json({ message: 'Email is confirmed.' });
};

const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  let found = null;
  try {
    found = await Factory.exists(user, { login });
  } catch (_e) {
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
  res.json({ 
		accessToken,
		id: found.id,
		login: found.login,
		email: found.email,
		fullName: found.fullName,
		role: found.role
	});
};

const refresh = async (req: Request, res: Response) => {
  const { refreshToken: token } = req.cookies;

  const data = Token.validate(token);
  if (!data || typeof data === "string" || !data.id) {
    throw new ClientError('The refresh token is invalid.', 403);
  }

  let found = null;
  try {
    found = await Factory.exists(user, { id: data.id });
  } catch (_e) {
    throw new ClientError("No user found", 404);
  }
  const { accessToken, refreshToken } = generateUserTokens(found);

  res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
  res.json({ accessToken });
};

const logout = (req: Request, res: Response) => {
  res.clearCookie('refreshToken');
  res.sendStatus(204);
};

const sendPasswordConfirmation = async (req: Request, res: Response) => {
  const { email } = req.body;
  
  let found = null;
  try {
    found = await Factory.exists(user, { email });
  } catch (_e) {
    throw new ClientError("No user with this email found", 404);
  }

  const token = Token.generateConfirmToken({ id: found.id });
  await Email.sendMail(email, templates.PASSWORD_CONFIRM, { login: found.login, token });

  res.status(200).send();
}

const confirmPassword = async (req: Request, res: Response) => {
  const { token } = req.params;
  let { password } = req.body;

  const data = Token.validate(token);
  if (!data || typeof data === "string" || !data.id) {
    throw new ClientError('The confirm token is invalid or has expired.', 401);
  }

  try {
    await Factory.exists(user, { id: data.id });
  } catch (_e) {
    throw new ClientError('The confirm token is invalid or has expired.', 401);
  }

  password = await hashPassword(password);
  await Factory.update(user, data.id, { password });

  res.status(200).send();
}

export { register, confirmEmail, login, refresh, logout, sendPasswordConfirmation, confirmPassword };

