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
import { createAccount, getAccountLink } from '../controllers/payment';
import auth from '../middleware/auth';
import { checkUserCompanyRights } from '../middleware/check-rights';
import boundary from '../utils/error-boundary';
import fileUpload from '../utils/file-upload';
import validate from '../utils/validation';
import { createSchema, getCompaniesSchema, updateSchema } from '../validation/companies';

const router = express.Router();

router.get('/', validate(getCompaniesSchema, 'query'), boundary(getCompanies));
router.get('/:id', boundary(getCompanyById));

router.use(auth);

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

router.post('/:id/stripe-account', boundary(createAccount));
router.get('/:id/stripe-account', boundary(getAccountLink));

export default router;
