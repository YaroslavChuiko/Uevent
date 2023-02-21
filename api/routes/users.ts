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
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { registerSchema, updateSchema } from '../validation/user';

const router = express.Router();

router.use(auth, adminAuth);

router.get('/', boundary(getMany));
router.get('/:id', boundary(getUser));

router.post('/', validate(registerSchema), boundary(createUser));
router.put('/:id', validate(updateSchema), boundary(updateUser));
router.delete('/:id', boundary(deleteUser));

router.put('/:id/avatar', boundary(uploadPhoto), boundary(updateUserAvatar));
router.delete('/:id/avatar', boundary(deleteUserAvatar));

export default router;
