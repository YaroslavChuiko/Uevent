import express from 'express';
import { getManyEvents, getOneEventById } from '../controllers/events';
import { createComment } from '../controllers/comments';
import { createPromoCode } from '../controllers/promo-codes';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import validate from '../utils/validation';
import { createUpdateSchema as createUpdateCommentSchema } from '../validation/comments';
import { createSchema as createPromoCodeSchema } from '../validation/promo-codes';
import { checkUserEventRights } from '../middleware/check-rights';

const router = express.Router();

router.get('/:id', boundary(getOneEventById));
router.get('/', boundary(getManyEvents));

router.use(auth);

router.post('/:id/comments', validate(createUpdateCommentSchema), boundary(createComment));

router.post('/:id/promo-codes', checkUserEventRights, validate(createPromoCodeSchema), boundary(createPromoCode));

export default router;

