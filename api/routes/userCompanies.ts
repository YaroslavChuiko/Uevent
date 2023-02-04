import express from 'express';
import { subscribeToCompany, getUserCompanies, unsubscribeFromCompany } from '../controllers/users';
import authMiddleware from '../middleware/auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { subscribeSchema } from '../validation/user';

const router = express.Router();

router.use(authMiddleware);

router.get('/', boundary(getUserCompanies));
router.post('/', validate(subscribeSchema), boundary(subscribeToCompany));
router.delete('/:id', boundary(unsubscribeFromCompany));

export default router;
