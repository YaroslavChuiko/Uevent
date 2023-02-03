import express from 'express';
import { getManyEvents, getOneEventById } from '../controllers/event';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.get('/:id', boundary(getOneEventById));
router.get('/', boundary(getManyEvents));

export default router;
