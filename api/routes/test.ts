import express from 'express';
import { getTest } from '../controllers/test';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.get('/', boundary(getTest));

export default router;
