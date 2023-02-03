import { Request, Response } from 'express';
import { DIR_UPLOADS_NAME } from '../consts/default';
import prisma from '../lib/prisma';
import ClientError from "../types/error";
import { User, Company } from "@prisma/client";
import path from "path";
import fs from "fs";

const company = prisma.company;

const checkFor = async (key: string, value: string, notId: number = 0) => {
  const exists = await company.findFirst({ 
    where: { 
      [key]: value,
      NOT: {
        id: notId
      } 
    }
  });
  if (exists) {
    throw new ClientError(`The company with this ${key} already exists.`, 400);
  }
};

function getPicture(picturePath: string | null): Buffer | null {
  let picture: Buffer | null = null;
  if (picturePath) {
    const filePath = path.resolve(DIR_UPLOADS_NAME, picturePath);
    try {
      picture = fs.readFileSync(filePath);
    }
    catch(err) {}
  }
  return picture;
}

function getCompanyForRes(com: Company) {
  return ({
    id: com.id,
    name: com.name,
    email: com.email,
    latitude: com.latitude,
    longitude: com.longitude,
    userId: com.userId,
    avatar: getPicture(com.picturePath),
  });
}

const getCompanies = async (req: Request, res: Response) => {
  const limit = req.query.limit ? Number(req.query.limit) : 10;
  const page = req.query.page ? Number(req.query.page) : 1;
  const offset = (page - 1) * limit;

  const [count, companies] = await prisma.$transaction([
    company.count(),
    company.findMany({
      skip: offset,
      take: limit,
    }),
  ]);

  res.json({
    count,
    companies: companies.map(getCompanyForRes),
  });
};

const getCompanyById = async (req: Request, res: Response) => {
  const companyId = Number(req.params.id);

  const found = await company.findFirst({
    where: {
      id: companyId
    }
  });
  if (!found) {
    throw new ClientError('The company is not found.', 404);
  }

  res.json(getCompanyForRes(found));
};

const createCompany = async (req: Request, res: Response) => {
	const data = req.body;
	const { id: userId } = req.user as User;

	await checkFor('name', data.name);
	await checkFor('email', data.email);

	const newCompany = await company.create({
    data: {
      ...data,
      picturePath: req?.file?.filename,
      userId,
    },
  });

  res.status(201).json(getCompanyForRes(newCompany));
};

const updateCompany = async (req: Request, res: Response) => {
	let {deleteAvatar, ...data} = req.body;
  const companyId = Number(req.params.id);

	if (data.name) {
    await checkFor('name', data.name, companyId);
  }
	if (data.email) {
    await checkFor('email', data.email, companyId);
  }

  deleteAvatar = deleteAvatar ? null : undefined;

	const updatedCompany = await company.update({
    where: {
      id: companyId
    },
    data: {
      ...data,
      picturePath: req?.file?.filename || deleteAvatar,
    },
  });

  res.status(201).json(getCompanyForRes(updatedCompany));
};

const deleteCompany = async (req: Request, res: Response) => {
  const companyId = Number(req.params.id);

  await company.delete({
    where: { id: companyId },
  });

  res.status(204).send();
};

export { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany };

