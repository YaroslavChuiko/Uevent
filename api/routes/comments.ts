import express from 'express';
import { getComments, getCommentById, updateComment, deleteComment } from '../controllers/comments';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import validate from '../utils/validation';
import { createUpdateSchema, getCommentsSchema } from '../validation/comments';
import { checkUserCommentRights } from '../middleware/check-rights';

const router = express.Router();

router.use(auth);

router.get('/', validate(getCommentsSchema, 'query'), boundary(getComments));
router.get('/:id', boundary(getCommentById));
router.put('/:id', checkUserCommentRights, validate(createUpdateSchema), boundary(updateComment));
router.delete('/:id', checkUserCommentRights, boundary(deleteComment));

export default router;

