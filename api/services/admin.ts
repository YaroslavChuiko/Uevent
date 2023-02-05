import logger from '../lib/logger';
import prisma from '../lib/prisma';
import { hashPassword } from '../utils/password';

const user = prisma.user;

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD as string;
const ADMIN_LOGIN = process.env.ADMIN_LOGIN as string;

interface IAdminData {
  login: string;
  email: string;
  fullName: string;
}

export const ADMIN_DATA: IAdminData = {
  login: ADMIN_LOGIN,
  email: ADMIN_EMAIL,
  fullName: ADMIN_LOGIN,
};

const Admin = {
  async createIfNotExists() {
    const exists = await user.findUnique({
      where: {
        email: ADMIN_EMAIL,
      },
    });
    if (exists) {
      return;
    }

    const password = await hashPassword(ADMIN_PASSWORD);
    const data = { ...ADMIN_DATA, password };
    await user.create({ data });
    logger.info('An admin was created with provided credentials.');
  },
};

export default Admin;
