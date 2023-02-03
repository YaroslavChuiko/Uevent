import express from 'express';
import profile from './profile';

const router = express.Router();

router.use('/profile', profile);

export default router;
