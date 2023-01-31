import { Prisma } from '@prisma/client';
import ClientError from "../types/error";

const Factory = {
  async exists(
        model: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, 
        where: Prisma.UserWhereUniqueInput) { 
    const found = await model.findUnique({ where });
    if (!found) {
      throw new ClientError('The entity does not exist.', 404);
    }
    return found;
  },

  async create(
        model: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>, 
        data: Prisma.UserCreateInput) {
    return model.create({ data });
  },

  async update (
    model: Prisma.UserDelegate<Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined>,
    id: number,
    data: Prisma.UserUpdateInput) {
    return model.update({
      where: { id: Number(id) },
      data,
    });
  },
};

export default Factory;

