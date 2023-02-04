import path from "path";
import fs from "fs";
import { Request } from 'express';
import multer, { FileFilterCallback } from 'multer';
import { DIR_UPLOADS_NAME } from "../consts/default";

type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

const fileFilter = (
    request: Request,
    file: Express.Multer.File,
    callback: FileFilterCallback
): void => {
    if (
        file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
    ) {
        callback(null, true);
    } else {
        callback(null, false);
    }
}

const storage = multer.diskStorage({
    destination: (
        request: Request,
        file: Express.Multer.File,
        callback: DestinationCallback
    ): void => {
        const dirPath = path.resolve(DIR_UPLOADS_NAME);
        if (!fs.existsSync(dirPath)){
            fs.mkdirSync(dirPath);
        }
        callback(null, dirPath);
    },

    filename: (
        req: Request, 
        file: Express.Multer.File, 
        callback: FileNameCallback
    ): void => {
        callback(null, `${Date.now()}-${file.fieldname}-${file.originalname}`);
    }
});

export default multer({ storage, fileFilter });

