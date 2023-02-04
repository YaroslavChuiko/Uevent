import express from 'express';
import { createEvent, updateEvent } from '../controllers/event';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema, updateSchema } from '../validation/event';

const router = express.Router();

router.post('/:id/event', validate(createSchema), boundary(createEvent));
router.put('/:companyId/event/:eventId', validate(updateSchema), boundary(updateEvent));

export default router;
