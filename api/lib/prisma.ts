import { PrismaClient } from '@prisma/client';
import { DIR_UPLOADS_NAME } from '../consts/default';
import path from "path";
import fs from "fs";

const prisma = new PrismaClient();

const company = prisma.company;

prisma.$use(async (params, next) => {
	if (params.model == 'Company') {
		if ((params.action == 'update' && params.args.data.picturePath) 
        || params.action == 'delete') {
			const exists = await company.findFirst({ 
				where: params.args.where,
				select: {
					picturePath: true
				} 
			});
			if (exists && exists.picturePath) {
				const pictureFilePath = path.resolve(DIR_UPLOADS_NAME, exists.picturePath);
				if (fs.existsSync(pictureFilePath)) {
					await fs.promises.unlink(pictureFilePath);
				}
			}
		}
	}
	return next(params);
});

export default prisma;
