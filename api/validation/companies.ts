import Joi from 'joi';
import { COMPANY_NAME_LENGTH, LATITUDE, LONGITUDE } from '../consts/validation';

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: Joi.string().email().required(),
  latitude: Joi.number().required().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Joi.number().required().min(LONGITUDE.min).max(LONGITUDE.max),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: Joi.string().email(),
  latitude: Joi.number().min(LATITUDE.min).max(LATITUDE.max),
  longitude: Joi.number().min(LONGITUDE.min).max(LONGITUDE.max),
});

const getCompaniesSchema = Joi.object()
  .keys({
    _start: Joi.number().min(0),
    _end: Joi.number().greater(Joi.ref('_start')),
    _sort: Joi.string(),
    _order: Joi.any().valid('ASC', 'DESC'),
    id: Joi.alternatives().try(Joi.number(), Joi.array().items(Joi.number())),
    creatorId: Joi.number(),
    subscriberId: Joi.number(),
    q: Joi.string(),
  })
  .and('_start', '_end')
  .and('_sort', '_order');

export { createSchema, updateSchema, getCompaniesSchema };
