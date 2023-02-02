import Joi from 'joi';
import { EVENT_NAME_LENGTH } from '../consts/validation';

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  description: Joi.string().allow(''),
  price: Joi.number().positive(), // if price == 0 ticket is free
  location: Joi.string().required(), //!
  ticketsLimit: Joi.number().positive().required(), // can it be unlimited?
  isNotificationsOn: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  date: Joi.date().iso().min('now'),
  publishDate: Joi.date().iso().less(Joi.ref('date')),
  formatId: Joi.number().positive(),
  themeId: Joi.number().positive(),
});

export { createSchema };
