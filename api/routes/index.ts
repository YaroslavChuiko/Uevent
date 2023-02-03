import express from 'express';
import test from './test';
import auth from './auth';
import companies from './companies';

const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/companies', companies);

export default router;
