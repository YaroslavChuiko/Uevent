import Stripe from 'stripe';

const CLIENT_URL = process.env.CLIENT_URL as string;

export const STRIPE_API_SECRET_KEY = process.env.STRIPE_API_SECRET_KEY as string;
export const STRIPE_WEBHOOK_KEY = process.env.STRIPE_WEBHOOK_KEY as string;
export const STRIPE_CONFIG: Stripe.StripeConfig = {
  apiVersion: '2022-11-15',
};

export const STRIPE_PAYMENT_OPTIONS: Stripe.Checkout.SessionCreateParams = {
  payment_method_types: ['card'],
  mode: 'payment',
  success_url: `${CLIENT_URL}/payment/success`,
  cancel_url: `${CLIENT_URL}/payment/cancel`,
};

export const TICKETS_UNLIMITED = -1;
