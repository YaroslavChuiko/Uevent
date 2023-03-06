import { Event, User } from '@prisma/client';
import { Request, Response } from 'express';
import EventService from '../services/event';
import stripe, { Stripe, STRIPE_WEBHOOK_KEY } from '../lib/stripe';
import { STRIPE_PAYMENT_OPTIONS } from '../consts/payment';
import EventSubscription, { IEventMeta } from '../services/event-subscription';
import logger from '../lib/logger';
import prisma from '../lib/prisma';

const promoCode = prisma.promoCode;

type StripeLineItem = Stripe.Checkout.SessionCreateParams.LineItem;

const getDiscount = async (eventId: number, curPromoCode: string) => {
  if (!curPromoCode) {
    return 0;
  }

  const found = await promoCode.findFirst({
    where: {
      promoCode: curPromoCode,
      eventId,
    },
  });
  return found ? found.discount : 0;
};

const stripeLineItem = (event: Event, discount: number): StripeLineItem => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: `Ticket for the '${event.name}' event`,
    },
    unit_amount: Number(event.price) * (100 - discount),
  },
  quantity: 1,
});

const createSession = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  const user = req.user as User;
  const isVisible = String(req.body.isVisible);

  const event = await EventService.findEventIfExists(eventId);
  await EventSubscription.check(event.id, user.id);

  if (event.price === 0) {
    const meta: IEventMeta = {
      metadata: {
        isVisible,
        eventId: String(eventId),
        userId: String(user.id),
      },
    };
    await EventSubscription.handleWith(meta);
    return res.json({ sessionId: -1 });
  }

  const discount = await getDiscount(eventId, req.body.promoCode);

  const params: Stripe.Checkout.SessionCreateParams = {
    ...STRIPE_PAYMENT_OPTIONS,
    line_items: [stripeLineItem(event, discount)],
    customer_email: user.email,
    payment_intent_data: {
      metadata: { eventId, userId: user.id, isVisible },
    },
  };

  const session = await stripe.checkout.sessions.create(params);

  res.json({ sessionId: session.id });
};

const stripeWebhook = async (req: Request, res: Response) => {
  const sig = req.headers['stripe-signature'] as string | string[];

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, STRIPE_WEBHOOK_KEY);
  } catch (err) {
    throw new Error(`Stripe webhook error: ${err}`);
  }

  if (event.type === 'payment_intent.succeeded') {
    const meta = event.data.object as IEventMeta;
    await EventSubscription.handleWith(meta);
    logger.info('Your payment was successful');
  }

  res.sendStatus(200);
};

export { createSession, stripeWebhook };
