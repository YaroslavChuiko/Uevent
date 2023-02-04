import Joi from 'joi';
import { COMPANY_NAME_LENGTH, COORDINATES } from '../consts/validation';

const createSchema = Joi.object().keys({
  name: Joi.string().required().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: Joi.string().email().required(),
  latitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
  longitude: Joi.number().required().min(COORDINATES.min).max(COORDINATES.max),
});

const updateSchema = Joi.object().keys({
  name: Joi.string().min(COMPANY_NAME_LENGTH.min).max(COMPANY_NAME_LENGTH.max),
  email: Joi.string().email(),
  latitude: Joi.number().min(COORDINATES.min).max(COORDINATES.max),
  longitude: Joi.number().min(COORDINATES.min).max(COORDINATES.max),
  deleteAvatar: Joi.boolean()
});

const getCompaniesSchema = Joi.object().keys({
  page: Joi.number().min(1),
  limit: Joi.number().min(1),
});

export { createSchema, updateSchema, getCompaniesSchema };

