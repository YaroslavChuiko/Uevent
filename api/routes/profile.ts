import express from 'express';
import {
  deleteProfile,
  deleteUserAvatar,
  getProfile,
  updateProfile,
  updateUserAvatar,
  uploadPhoto,
} from '../controllers/profile';
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { updateSchema } from '../validation/user';

const router = express.Router();

router.use(auth);

router.get('/', boundary(getProfile));
router.put('/avatar', boundary(uploadPhoto), boundary(updateUserAvatar));
router.delete('/avatar', boundary(deleteUserAvatar));
router.put('/', validate(updateSchema), boundary(updateProfile));
router.delete('/', boundary(deleteProfile));

export default router;
