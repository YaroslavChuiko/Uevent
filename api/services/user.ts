import { Prisma } from '@prisma/client';
import templates from '../consts/email';
import prisma from '../lib/prisma';
import ClientError from '../types/error';
import { hashPassword } from '../utils/password';
import { QueryParams } from '../utils/query-options';
import Avatar from './avatar';
import Email from './email';
import EventService from './event';
import Token from './token';

const user = prisma.user;

type UserQueryParams = QueryParams & {
  companyId?: number;
  eventId?: number;
};

interface IUser {
  login: string;
  email: string;
  fullName: string;
  password: string;
}

const UserService = {
  async checkFor(key: string, value: string, id: number = 0) {
    const exists = await user.findFirst({
      where: {
        [key]: value,
        NOT: { id },
      },
    });
    if (exists) {
      throw new ClientError(`The user with this ${key} already exists.`, 400);
    }
  },

  async findOrThrow(id: number) {
    const found = await user.findUnique({ where: { id } });
    if (!found) {
      throw new ClientError('This user does not exist', 404);
    }
    return found;
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
    if (data.login) {
      await UserService.checkFor('login', data.login, id);
    }
    if (data.email) {
      await UserService.checkFor('email', data.email, id);
    }

    await user.update({ where: { id }, data });
  },

  async updateAvatar(id: number, picturePath: string) {
    const toUpdate = await this.findOrThrow(id);
    await Avatar.removeFrom(toUpdate);

    await user.update({ data: { picturePath }, where: { id } });
  },

  async deleteAvatar(id: number) {
    const toUpdate = await this.findOrThrow(id);
    await Avatar.removeFrom(toUpdate);

    await user.update({ data: { picturePath: null }, where: { id } });
  },

  async getWhereOptions(params: UserQueryParams, userId?: number) {
    const where: Prisma.UserWhereInput = { AND: [] };
    let isViewAllowed = true;

    if (!params) {
      return { where, isViewAllowed };
    }

    const { q, companyId, eventId } = params;

    if (q) {
      const { q } = params;
      Array.isArray(where.AND) &&
        where.AND.push({
          OR: [
            {
              login: { contains: q },
            },
            {
              email: { contains: q },
            },
          ],
        });
    }
    if (companyId) {
      Array.isArray(where.AND) &&
        where.AND.push({
          subscriptions: {
            some: {
              companyId: Number(companyId),
            },
          },
        });
    }
    if (eventId) {
      isViewAllowed = await EventService.isUsersQueryAllowed(Number(eventId), userId);

      isViewAllowed &&
        Array.isArray(where.AND) &&
        where.AND.push({
          events: {
            some: {
              eventId: Number(eventId),
              isVisible: true,
            },
          },
        });
    }

    return { where, isViewAllowed };
  },
};

export default UserService;
