import express from 'express';
import {
  createComment,
  deleteComment,
  getCommentById,
  getComments,
  updateComment,
} from '../controllers/comments';
import auth from '../middleware/auth';
import { checkUserCommentRights } from '../middleware/check-rights';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema, getCommentsSchema, updateSchema } from '../validation/comments';

const router = express.Router();

router.get('/', validate(getCommentsSchema, 'query'), boundary(getComments));
router.get('/:id', boundary(getCommentById));

router.use(auth);

router.post('/', validate(createSchema), boundary(createComment));
router.put('/:id', checkUserCommentRights, validate(updateSchema), boundary(updateComment));
router.delete('/:id', checkUserCommentRights, boundary(deleteComment));

export default router;
