import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { DISCOUNT, PROMO_CODE_LENGTH } from '../consts/validation';

const createSchema = yupResolver(
  Yup.object().shape({
    eventId: Yup.number().positive().required(),
    promoCode: Yup.string().required().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
    discount: Yup.number().required().min(DISCOUNT.min).max(DISCOUNT.max),
  }),
);

const updateSchema = yupResolver(
  Yup.object().shape({
    promoCode: Yup.string().min(PROMO_CODE_LENGTH.min).max(PROMO_CODE_LENGTH.max),
    discount: Yup.number().min(DISCOUNT.min).max(DISCOUNT.max),
  }),
);

export { createSchema, updateSchema };
