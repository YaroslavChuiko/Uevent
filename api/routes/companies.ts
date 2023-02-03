import express from 'express';
import { getCompanies, getCompanyById, createCompany, updateCompany, deleteCompany } from '../controllers/companies';
import validate from '../utils/validation';
import { createSchema, updateSchema, getCompaniesSchema } from '../validation/companies';
import boundary from '../utils/error-boundary';
import auth from '../middleware/auth';
import fileUpload from '../middleware/fileUpload';
import { checkUserCompanyRights } from '../middleware/checkRights';

const router = express.Router();

router.use(auth);

router.get('/', validate(getCompaniesSchema, "query"), boundary(getCompanies));
router.get('/:id', boundary(getCompanyById));
router.post('/', fileUpload.single("avatar"), validate(createSchema), boundary(createCompany));
router.put('/:id', checkUserCompanyRights, fileUpload.single("avatar"), validate(updateSchema), boundary(updateCompany));
router.delete('/:id', checkUserCompanyRights, boundary(deleteCompany));

export default router;

