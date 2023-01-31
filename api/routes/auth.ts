import express from 'express';
import { register, login, refresh, confirmEmail, logout, sendPasswordConfirmation, confirmPassword } from '../controllers/auth';
import validate from '../utils/validation';
import { registerSchema, loginSchema, sendPasswordConfirmationSchema, confirmPasswordSchema } from '../validation/user';
import boundary from '../utils/error-boundary';

const router = express.Router();

router.post('/register', validate(registerSchema), boundary(register));
router.post('/login', validate(loginSchema), boundary(login));
router.post('/refresh', boundary(refresh));
router.post('/logout', boundary(logout));
router.post('/confirm-email/:token', boundary(confirmEmail));
router.post("/password-reset", validate(sendPasswordConfirmationSchema), boundary(sendPasswordConfirmation));
router.post("/password-reset/:token", validate(confirmPasswordSchema), boundary(confirmPassword));

export default router;

