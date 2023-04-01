import { Company } from '@prisma/client';
import prisma from '../lib/prisma';
import ClientError from '../types/error';

const company = prisma.company;

const CompanyService = {
  async findOneOrThrow(id: number) {
    const found = await company.findFirst({
      where: { id },
    });
    if (!found) {
      throw new ClientError('The company is not found.', 404);
    }
    return found;
  },

  async update(id: number, data: any) {
    const updated = await company.update({
      where: { id },
      data,
    });
    return updated;
  },

  async isStripeConnected(id: number) {
    const company = await this.findOneOrThrow(id);
    if (!company.stripeId) {
      throw new ClientError(
        "The company's stripe account does not exist or is not connected to our platform.",
        403,
      );
    }
    return company.stripeId;
  },
};

export default CompanyService;
