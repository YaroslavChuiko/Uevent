import Joi from 'joi';
import { PROMO_CODE_LENGTH, DISCOUNT } from '../consts/validation';

const createSchema = Joi.object().keys({
  eventId: Joi.number().positive().required(),
  promoCode: Joi.string().required().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
  discount: Joi.number().required().min(DISCOUNT.min).max(DISCOUNT.max),
});

const updateSchema = Joi.object().keys({
  promoCode: Joi.string().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
  discount: Joi.number().min(DISCOUNT.min).max(DISCOUNT.max),
});

const getPromoCodesSchema = Joi.object()
  .keys({
    _start: Joi.number().min(0),
    _end: Joi.number().greater(Joi.ref('_start')),
    _sort: Joi.string(),
    _order: Joi.any().valid('ASC', 'DESC'),
    id: Joi.alternatives().try(Joi.number(), Joi.array().items(Joi.number())),
    eventId: Joi.number(),
    q: Joi.string(),
  })
  .and('_start', '_end')
  .and('_sort', '_order');

export { createSchema, updateSchema, getPromoCodesSchema };
