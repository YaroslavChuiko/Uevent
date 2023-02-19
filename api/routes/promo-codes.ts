import express from 'express';
import {
  getPromoCodes,
  getPromoCodeById,
  updatePromoCode,
  deletePromoCode,
  createPromoCode,
} from '../controllers/promo-codes';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import validate from '../utils/validation';
import { updateSchema, getPromoCodesSchema, createSchema } from '../validation/promo-codes';
import { checkUserEventRights, checkUserPromoCodeRights } from '../middleware/check-rights';

const router = express.Router();

router.use(auth);

router.get('/', validate(getPromoCodesSchema, 'query'), boundary(getPromoCodes));
router.post('/', validate(createSchema), checkUserEventRights, boundary(createPromoCode));
router.get('/:id', checkUserPromoCodeRights, boundary(getPromoCodeById));
router.put('/:id', checkUserPromoCodeRights, validate(updateSchema), boundary(updatePromoCode));
router.delete('/:id', checkUserPromoCodeRights, boundary(deletePromoCode));

export default router;
