import Joi from 'joi';
import logger from '../lib/logger';

const envSchema = Joi.object()
  .keys({
    DATABASE_URL: Joi.string().required(),
    CLIENT_URL: Joi.string().required(),
    ADMIN_URL: Joi.string().required(),
    SERVER_URL: Joi.string().required(),
    SERVER_PORT: Joi.number().required(),

    TOKEN_SECRET: Joi.string().required(),
    TOKEN_EXPIRES_IN: Joi.string().required(),

    EMAIL_HOST: Joi.string().required(),
    EMAIL_PORT: Joi.number().required(),
    EMAIL_USERNAME: Joi.string().required(),
    EMAIL_PASSWORD: Joi.string().required(),

    ADMIN_EMAIL: Joi.string().email().required(),
    ADMIN_LOGIN: Joi.string().required(),
    ADMIN_PASSWORD: Joi.string().required(),

    STRIPE_API_SECRET_KEY: Joi.string().required(),
    STRIPE_WEBHOOK_KEY: Joi.string().required(),
  })
  .options({ allowUnknown: true });

const validateEnv = () => {
  const { error } = envSchema.validate(process.env);
  if (error) {
    logger.error(`Env validation error: ${error.message}`);
    process.exit(1);
  }
};

export default validateEnv;
