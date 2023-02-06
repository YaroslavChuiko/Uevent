import express from 'express';
import { getManyEvents, getOneEventById } from '../controllers/events';
import { createComment } from '../controllers/comments';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import validate from '../utils/validation';
import { createUpdateSchema } from '../validation/comments';

const router = express.Router();

router.get('/:id', boundary(getOneEventById));
router.get('/', boundary(getManyEvents));

router.use(auth);

router.post('/:id/comments', validate(createUpdateSchema), boundary(createComment));

export default router;

