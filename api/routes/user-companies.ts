import express from 'express';
import {
  subscribeToCompany,
  getUserCompanies,
  unsubscribeFromCompany,
} from '../controllers/user-companies';
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.use(auth);

router.get('/', boundary(getUserCompanies));
router.post('/:id', boundary(subscribeToCompany));
router.delete('/:id', boundary(unsubscribeFromCompany));

export default router;
