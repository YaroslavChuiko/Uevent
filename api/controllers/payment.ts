import { Event } from '@prisma/client';
import { Request, Response } from 'express';
import EventService from '../services/event';
import stripe, { Stripe, STRIPE_WEBHOOK_KEY } from '../lib/stripe';
import { STRIPE_PAYMENT_OPTIONS } from '../consts/payment';
import EventSubscription, { IEventMeta } from '../services/event-subscription';
import logger from '../lib/logger';

type StripeLineItem = Stripe.Checkout.SessionCreateParams.LineItem;

const stripeLineItem = (event: Event): StripeLineItem => ({
  price_data: {
    currency: 'usd',
    product_data: {
      name: `Ticket for the '${event.name}' event`,
    },
    unit_amount: event.price * 100,
  },
  quantity: 1,
});

const createSession = async (req: Request, res: Response) => {
  const eventId = Number(req.params.id);
  // const user = req.user as User;
  const user = { id: 2, email: 'sdlj@gmail.com' };
  const isVisible = String(req.body.isVisible || false);

  const event = await EventService.findEventIfExists(eventId);
  await EventSubscription.check(event, user.id);

  const params: Stripe.Checkout.SessionCreateParams = {
    ...STRIPE_PAYMENT_OPTIONS,
    line_items: [stripeLineItem(event)],
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
