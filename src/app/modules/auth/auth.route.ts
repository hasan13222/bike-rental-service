import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { verifyCookieToken } from '../../middleware/auth';
const router = express.Router();

router.post(
  '/signup',
  validateRequest(UserValidations.createUserValidationSchema),
  AuthControllers.signup,
);
router.post(
  '/login',
  validateRequest(UserValidations.loginUserValidationSchema),
  AuthControllers.login,
);

router.get('/check-login', verifyCookieToken(), AuthControllers.checkLogin());
router.post('/logout', AuthControllers.logout())

export const AuthRoutes = router;
