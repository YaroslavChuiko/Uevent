import express from 'express';
import test from './test';
import auth from './auth';
import company from './company';
import event from './event';

const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/company', company);
router.use('/event', event);

export default router;
