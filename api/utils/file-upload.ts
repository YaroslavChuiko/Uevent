import path from 'path';
import fs from 'fs';
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { DIR_UPLOADS_NAME } from '../consts/default';
import ClientError from '../types/error';
import logger from '../lib/logger';

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const FILE_FORMATS = ['image/png', 'image/jpg', 'image/jpeg'];

const fileFilter = (
  request: Request,
  file: Express.Multer.File,
  callback: FileFilterCallback,
): void => {
  if (FILE_FORMATS.includes(file.mimetype)) {
    callback(null, true);
  } else {
    const error = new ClientError(
      `The file format should be one of: ${FILE_FORMATS.join(', ')}`,
      400,
    );
    callback(error);
  }
};

const storage = multer.diskStorage({
  destination: (
    request: Request,
    file: Express.Multer.File,
    callback: DestinationCallback,
  ): void => {
    const dirPath = path.resolve(DIR_UPLOADS_NAME);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }
    callback(null, dirPath);
  },

  filename: (req: Request, file: Express.Multer.File, callback: FileNameCallback): void => {
    callback(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
  },
});

export default multer({ storage, fileFilter });
