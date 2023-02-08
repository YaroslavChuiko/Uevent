import Joi from 'joi';
import { FORMAT_THEME_LENGTH } from '../consts/validation';

const createUpdateSchema = Joi.object().keys({
  name: Joi.string().required().min(FORMAT_THEME_LENGTH.min).max(FORMAT_THEME_LENGTH.max)
});

const getManySchema = Joi.object().keys({
  _start: Joi.number().min(0),
  _end: Joi.number().greater(Joi.ref('_start')),
  _sort: Joi.string(),
  _order: Joi.any().valid('ASC', 'DESC'),
  id: Joi.alternatives().try(Joi.number(), Joi.array().items(Joi.number())),
  q: Joi.string(),
})
.and('_start', '_end')
.and('_sort', '_order');

export { createUpdateSchema, getManySchema };

