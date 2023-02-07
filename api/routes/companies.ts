import express from 'express';
import {
  createCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateCompany,
  updateAvatar,
  deleteAvatar,
} from '../controllers/companies';
import { createEvent, deleteEvent, updateEvent } from '../controllers/events';
import auth from '../middleware/auth';
import { checkUserCompanyRights } from '../middleware/check-rights';
import boundary from '../utils/error-boundary';
import fileUpload from '../utils/file-upload';
import validate from '../utils/validation';
import { createSchema, getCompaniesSchema, updateSchema } from '../validation/companies';
import {
  createSchema as createEventSchema,
  updateSchema as updateEventSchema,
} from '../validation/events';

const router = express.Router();

router.use(auth);

router.get('/', validate(getCompaniesSchema, 'query'), boundary(getCompanies));
router.get('/:id', boundary(getCompanyById));
router.post('/', validate(createSchema), boundary(createCompany));
router.put('/:id', checkUserCompanyRights, validate(updateSchema), boundary(updateCompany));
router.delete('/:id', checkUserCompanyRights, boundary(deleteCompany));
router.put('/:id/avatar', checkUserCompanyRights, fileUpload.single('avatar'), boundary(updateAvatar));
router.delete('/:id/avatar', checkUserCompanyRights, boundary(deleteAvatar));

router.post(
  '/:id/event',
  checkUserCompanyRights,
  fileUpload.single('avatar'),
  validate(createEventSchema),
  boundary(createEvent),
);
router.put(
  '/:id/event/:eventId',
  checkUserCompanyRights,
  fileUpload.single('avatar'),
  validate(updateEventSchema),
  boundary(updateEvent),
);
router.delete('/:id/event/:eventId', checkUserCompanyRights, boundary(deleteEvent));

export default router;
