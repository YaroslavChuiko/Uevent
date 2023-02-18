import express from 'express';
import { subscribeToCompany, unsubscribeFromCompany } from '../controllers/user-companies';
import auth from '../middleware/auth';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.use(auth);

router.post('/:id', boundary(subscribeToCompany));
router.delete('/:id', boundary(unsubscribeFromCompany));

export default router;
