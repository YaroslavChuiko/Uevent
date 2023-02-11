import { Company, User, Event } from '@prisma/client';
import { DIR_UPLOADS_NAME } from '../consts/default';
import path from 'path';
import fs from 'fs';
import prisma from '../lib/prisma';

const user = prisma.user;
const company = prisma.company;

type ModelWithAvatar = User | Company | Event | null;

type CompanyWithEvents = {
  picturePath: string | null;
  events: {
      picturePath: string | null;
  }[];
};

const Avatar = {
  async _removeFile(fileName: string | null) {
    if (!fileName) {
      return;
    }

    const fileToRemove = path.resolve(DIR_UPLOADS_NAME, fileName);
    if (fs.existsSync(fileToRemove)) {
      await fs.promises.unlink(fileToRemove);
    }
  },

  async removeFrom(obj: ModelWithAvatar) {
    if (!obj || !obj.picturePath) {
      return;
    }
    await this._removeFile(obj.picturePath);
  },

  async removeFromUserById(userId: number) {
    const found = await user.findUnique({ 
      where: { id: userId },
      select: { 
        picturePath: true, 
        companies: {
          select: {
            picturePath: true,
            events: {
              select: {
                picturePath: true
              }
            }
          }
        } 
      }
    });

    if (!found) {
      return;
    }

    await this._removeFile(found.picturePath);
    await Promise.all(found.companies.map(async (curCompany) => {
      await this._removeFromCompany(curCompany);
    }));
  },

  async removeFromCompanyById(companyId: number) {
    const found = await company.findUnique({ 
      where: { id: companyId },
      select: { 
        picturePath: true, 
        events: {
          select: {
            picturePath: true
          }
        } 
      }
    });

    if (!found) {
      return;
    }
    await this._removeFromCompany(found);
  },

  async _removeFromCompany(curCompany: CompanyWithEvents) {
    await this._removeFile(curCompany.picturePath);
    await Promise.all(curCompany.events.map(async (curEvent) => {
      await this._removeFile(curEvent.picturePath);
    }));
  }
};

export default Avatar;
