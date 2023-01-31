import express from 'express';
import test from './test';
import auth from './auth';

const router = express.Router();

router.use('/test', test);
router.use('/auth', auth);

export default router;
