import express from 'express';
import {
  getThemes,
  getThemeById,
  createTheme,
  updateTheme,
  deleteTheme,
} from '../controllers/themes';
import auth from '../middleware/auth';
import adminAuth from '../middleware/admin-auth';
import boundary from '../utils/error-boundary';
import validate from '../utils/validation';
import { createUpdateSchema, getManySchema } from '../validation/formats-themes';

const router = express.Router();

router.get('/', validate(getManySchema, 'query'), boundary(getThemes));
router.get('/:id', boundary(getThemeById));

router.use(auth);
router.use(adminAuth);

router.post('/', validate(createUpdateSchema), boundary(createTheme));
router.put('/:id', validate(createUpdateSchema), boundary(updateTheme));
router.delete('/:id', boundary(deleteTheme));

export default router;
