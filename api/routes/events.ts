import express from 'express';
import { createComment } from '../controllers/comments';
import {
  deleteEvent,
  deletePoster,
  getManyEvents,
  getOneEventById,
  updateEvent,
  updatePoster,
} from '../controllers/events';
import { createPromoCode } from '../controllers/promo-codes';
import auth from '../middleware/auth';
import { checkUserEventRights } from '../middleware/check-rights';
import boundary from '../utils/error-boundary';
import fileUpload from '../utils/file-upload';
import validate from '../utils/validation';
import { createUpdateSchema as createUpdateCommentSchema } from '../validation/comments';
import { updateSchema } from '../validation/events';
import { createSchema as createPromoCodeSchema } from '../validation/promo-codes';

const router = express.Router();

router.get('/', boundary(getManyEvents));
router.get('/:id', boundary(getOneEventById));

router.use(auth);

router.put('/:id', checkUserEventRights, validate(updateSchema), boundary(updateEvent));
router.delete('/:id', checkUserEventRights, boundary(deleteEvent));
router.put(
  '/:id/poster',
  checkUserEventRights,
  fileUpload.single('poster'),
  boundary(updatePoster),
);
router.delete('/:id/poster', checkUserEventRights, boundary(deletePoster));

router.post('/:id/comments', validate(createUpdateCommentSchema), boundary(createComment));

router.post(
  '/:id/promo-codes',
  checkUserEventRights,
  validate(createPromoCodeSchema),
  boundary(createPromoCode),
);

export default router;
