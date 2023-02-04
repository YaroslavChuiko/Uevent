import express from 'express';
import { createEvent, deleteEvent, updateEvent } from '../controllers/event';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createSchema, updateSchema } from '../validation/event';

const router = express.Router();

router.post('/:id/event', validate(createSchema), boundary(createEvent));
router.put('/:companyId/event/:eventId', validate(updateSchema), boundary(updateEvent));
router.delete('/:companyId/event/:eventId', boundary(deleteEvent));

export default router;
