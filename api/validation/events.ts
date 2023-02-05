import Joi from 'joi';
import { COORDINATES, EVENT_NAME_LENGTH } from '../consts/validation';

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(), // if price == 0 ticket is free
  ticketsLimit: Joi.number().positive().required(), // can it be unlimited?
  isNotificationsOn: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  date: Joi.date().iso().min('now'),
  publishDate: Joi.date().iso().less(Joi.ref('date')),
  latitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
  longitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
  formatId: Joi.number().positive(),
  themeId: Joi.number().positive(),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().required().min(EVENT_NAME_LENGTH.min).max(EVENT_NAME_LENGTH.max),
  description: Joi.string().allow(''),
  price: Joi.number().positive().required(),
  ticketsLimit: Joi.number().positive().required(),
  isNotificationsOn: Joi.boolean().required(),
  isPublic: Joi.boolean().required(),
  date: Joi.date().iso().min('now'),
  publishDate: Joi.date().iso().less(Joi.ref('date')),
  latitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
  longitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
  formatId: Joi.number().positive(),
  themeId: Joi.number().positive(),
  deleteAvatar: Joi.boolean(),
});

export { createSchema, updateSchema };
