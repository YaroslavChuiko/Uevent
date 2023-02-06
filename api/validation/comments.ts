import Joi from 'joi';
import { COMMENT_CONTENT_LENGTH } from '../consts/validation';

const createUpdateSchema = Joi.object().keys({
	content: Joi.string().required().min(COMMENT_CONTENT_LENGTH.min).max(COMMENT_CONTENT_LENGTH.max),
});

const getCommentsSchema = Joi.object().keys({
  _start: Joi.number().min(0),
  _end: Joi.number().greater(Joi.ref('_start')),
  _sort: Joi.string(),
  _order: Joi.any().valid('ASC', 'DESC'),
  id: Joi.alternatives().try(Joi.number(), Joi.array().items(Joi.number())),
  userId: Joi.number(),
  eventId: Joi.number(),
  q: Joi.string(),
})
.and('_start', '_end')
.and('_sort', '_order');

export { createUpdateSchema, getCommentsSchema };

