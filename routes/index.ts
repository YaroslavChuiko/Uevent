import express from 'express';
import test from './test';

const router = express.Router();

router.use('/test', test);

export default router;
