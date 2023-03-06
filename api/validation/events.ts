import Joi from 'joi';
import { LATITUDE, LONGITUDE, EVENT_NAME_LENGTH } from '../consts/validation';

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(), // if price == 0 ticket is free
  ticketsAvailable: Joi.number().positive().required(), // can it be unlimited?
  isNotificationsOn: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  date: Joi.date().iso().min('now').required(),
  publishDate: Joi.date().iso().min('now').less(Joi.ref('date')).required(),
  latitude: Joi.number().required().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Joi.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
  companyId: Joi.number().positive().required(),
  formatId: Joi.number().positive().required(),
  themeId: Joi.number().positive().required(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  description: Joi.string().required(),
  price: Joi.number().min(0).required(),
  ticketsAvailable: Joi.number().min(0).required(),
  isNotificationsOn: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  date: Joi.date().iso().min('now').required(),
  publishDate: Joi.date().iso().less(Joi.ref('date')).required(),
  latitude: Joi.number().required().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Joi.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
  formatId: Joi.number().positive().required(),
  themeId: Joi.number().positive().required(),
});

const isVisible = Joi.boolean().required();

const eventSubSchema = Joi.object().keys({
  isVisible,
});

const ticketSchema = Joi.object().keys({
  isVisible,
  promoCode: Joi.string(),
});

export { createSchema, updateSchema, eventSubSchema, ticketSchema };
