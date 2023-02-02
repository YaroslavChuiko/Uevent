import express from 'express';
import test from './test';
import auth from './auth';
import company from './company';

const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);
router.use('/company', company);

export default router;
