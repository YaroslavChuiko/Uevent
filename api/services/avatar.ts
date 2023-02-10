import { Company, User } from '@prisma/client';
import { DIR_UPLOADS_NAME } from '../consts/default';
import path from 'path';
import fs from 'fs';

type ModelWithAvatar = User | Company | null;

const Avatar = {
  async removeFrom(obj: ModelWithAvatar) {
    if (!obj || !obj.picturePath) {
      return;
    }

    const fileToRemove = path.resolve(DIR_UPLOADS_NAME, obj.picturePath);
    if (fs.existsSync(fileToRemove)) {
      await fs.promises.unlink(fileToRemove);
    }
  },
};

export default Avatar;
