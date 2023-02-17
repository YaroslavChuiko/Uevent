import express from 'express';
import auth from './auth';
import companies from './companies';
import events from './events';
import users from './users';
import comments from './comments';
import promoCodes from './promo-codes';
import formats from './formats';
import themes from './themes';
import profile from './profile';
import userCompanies from './user-companies';

const router = express.Router();

router.use('/auth', auth);
router.use('/companies', companies);
router.use('/events', events);
router.use('/users', users);
router.use('/comments', comments);
router.use('/promo-codes', promoCodes);
router.use('/formats', formats);
router.use('/themes', themes);
router.use('/me/companies', userCompanies);
router.use('/me/profile', profile);

export default router;
