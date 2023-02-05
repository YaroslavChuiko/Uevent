import express from 'express';
import { createUser, deleteUser, getMany, getUser, updateUser } from '../controllers/users';
import adminAuth from '../middleware/admin-auth';
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { registerSchema, updateSchema } from '../validation/user';
import profile from './profile';
import userCompanies from './user-companies';

const router = express.Router();

router.use('/profile', profile);
router.use('/me/companies', userCompanies);

router.use(auth, adminAuth);

router.get('/', boundary(getMany));
router.get('/:id', boundary(getUser));

router.post('/', validate(registerSchema), boundary(createUser));
router.put('/:id', validate(updateSchema), boundary(updateUser));
router.delete('/:id', boundary(deleteUser));

export default router;
