import express from 'express';
import test from './test';
import auth from './auth';
import company from './companies';
import event from './events';

const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/companies', company);
router.use('/events', event);

export default router;
