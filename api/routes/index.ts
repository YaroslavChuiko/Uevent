import express from 'express';
import auth from './auth';
import companies from './companies';
import events from './events';
import users from './users';

const router = express.Router();

router.use('/auth', auth);
router.use('/companies', companies);
router.use('/events', events);
router.use('/users', users);

export default router;
