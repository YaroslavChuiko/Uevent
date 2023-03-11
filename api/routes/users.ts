import express from 'express';
import { uploadPhoto } from '../controllers/profile';
import {
  createUser,
  deleteUser,
  deleteUserAvatar,
  getMany,
  getUser,
  updateUser,
  updateUserAvatar,
} from '../controllers/users';
import adminAuth from '../middleware/admin-auth';
import auth, { optionalAuth } from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { adminUpdateSchema, createSchema } from '../validation/user';

const router = express.Router();

router.get('/:id', boundary(getUser));
router.get('/', optionalAuth, boundary(getMany));

router.use(auth, adminAuth);

router.post('/', validate(createSchema), boundary(createUser));
router.put('/:id', validate(adminUpdateSchema), boundary(updateUser));
router.delete('/:id', boundary(deleteUser));

router.put('/:id/avatar', boundary(uploadPhoto), boundary(updateUserAvatar));
router.delete('/:id/avatar', boundary(deleteUserAvatar));

export default router;
