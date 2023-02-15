import Stripe from 'stripe';
import { STRIPE_API_SECRET_KEY, STRIPE_WEBHOOK_KEY, STRIPE_CONFIG } from '../consts/payment';

const stripe = new Stripe(STRIPE_API_SECRET_KEY, STRIPE_CONFIG);

export { Stripe, STRIPE_WEBHOOK_KEY };
export default stripe;
