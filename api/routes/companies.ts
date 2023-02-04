import express from 'express';
import { createEvent, deleteEvent, updateEvent } from '../controllers/events';
import {
  createSchema as createEventSchema,
  updateSchema as updateEventSchema,
} from '../validation/events';
import {
  getCompanies,
  getCompanyById,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../controllers/companies';
import validate from '../utils/validation';
import { createSchema, updateSchema, getCompaniesSchema } from '../validation/companies';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import fileUpload from '../utils/fileUpload';
import { checkUserCompanyRights } from '../middleware/checkRights';

const router = express.Router();

router.use(auth);

router.get('/', validate(getCompaniesSchema, 'query'), boundary(getCompanies));
router.get('/:id', boundary(getCompanyById));
router.post('/', fileUpload.single('avatar'), validate(createSchema), boundary(createCompany));
router.put(
  '/:id',
  checkUserCompanyRights,
  fileUpload.single('avatar'),
  validate(updateSchema),
  boundary(updateCompany),
);
router.delete('/:id', checkUserCompanyRights, boundary(deleteCompany));

router.post('/:id/event', validate(createEventSchema), boundary(createEvent));
router.put('/:companyId/event/:eventId', validate(updateEventSchema), boundary(updateEvent));
router.delete('/:companyId/event/:eventId', boundary(deleteEvent));

export default router;
