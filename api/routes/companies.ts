import express from 'express';
import {
  createCompany,
  deleteAvatar,
  deleteCompany,
  getCompanies,
  getCompanyById,
  updateAvatar,
  updateCompany,
} from '../controllers/companies';
import { createEvent } from '../controllers/events';
import auth from '../middleware/auth';
import { checkUserCompanyRights } from '../middleware/check-rights';
import boundary from '../utils/error-boundary';
import fileUpload from '../utils/file-upload';
import validate from '../utils/validation';
import { createSchema, getCompaniesSchema, updateSchema } from '../validation/companies';
import { createSchema as createEventSchema } from '../validation/events';

const router = express.Router();

router.use(auth);

router.get('/', validate(getCompaniesSchema, 'query'), boundary(getCompanies));
router.get('/:id', boundary(getCompanyById));
router.post('/', validate(createSchema), boundary(createCompany));
router.put('/:id', checkUserCompanyRights, validate(updateSchema), boundary(updateCompany));
router.delete('/:id', checkUserCompanyRights, boundary(deleteCompany));
router.put(
  '/:id/avatar',
  checkUserCompanyRights,
  fileUpload.single('avatar'),
  boundary(updateAvatar),
);
router.delete('/:id/avatar', checkUserCompanyRights, boundary(deleteAvatar));

router.post(
  '/:id/events',
  checkUserCompanyRights,
  validate(createEventSchema),
  boundary(createEvent),
);

export default router;
