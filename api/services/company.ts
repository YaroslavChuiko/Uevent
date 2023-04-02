import logger from '../lib/logger';
import prisma from '../lib/prisma';
import stripe from '../lib/stripe';
import ClientError from '../types/error';
import Avatar from './avatar';

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

  async predelete(id: number) {
    const found = await this.findOneOrThrow(id);
    await Avatar.removeFromCompanyById(id);

    if (found.stripeId && process.env.NODE_ENV === 'development') {
      await stripe.accounts.del(found.stripeId);
      logger.warn(`A stripe account with the ${found.stripeId} id was removed.`);
    }
  },

  async checkAccountOrThrow(stripeId: string) {
    const account = await stripe.accounts.retrieve(stripeId);
    if (!account.details_submitted) {
      throw new ClientError('The company has not completed their account.', 403);
    }
  },

  async isAccountValid(stripeId: string) {
    try {
      await this.checkAccountOrThrow(stripeId);
      return true;
    } catch (err) {
      return false;
    }
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
