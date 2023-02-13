import templates from '../consts/email';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { hashPassword } from '../utils/password';
import Email from './email';
import Token from './token';

const user = prisma.user;

interface IUser {
  login: string;
  email: string;
  fullName: string;
  password: string;
}

const UserService = {
  async checkFor(key: string, value: string) {
    const exists = await user.findUnique({ where: { [key]: value } });
    if (exists) {
      throw new ClientError(`The user with this ${key} already exists.`, 400);
    }
  },

  async create(data: IUser) {
    await UserService.checkFor('login', data.login);
    await UserService.checkFor('email', data.email);

    const password = await hashPassword(data.password);
    const { id } = await user.create({
      data: { ...data, password },
    });
    const { email, login } = data;

    const token = Token.generateConfirmToken({ id });
    await Email.sendMail(email, templates.EMAIL_CONFIRM, { login, token });
    return { id };
  },

  async update(id: number, data: IUser) {
    await UserService.checkFor('login', data.login);
    await UserService.checkFor('email', data.email);

    await user.update({ where: { id }, data });
  },
};

export default UserService;
