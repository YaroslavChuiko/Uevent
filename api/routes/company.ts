import express from 'express';
import { createEvent } from '../controllers/event';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema } from '../validation/event';

const router = express.Router();

router.post('/:id/event', validate(createSchema), boundary(createEvent));
