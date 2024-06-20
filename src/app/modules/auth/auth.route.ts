import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
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

export const AuthRoutes = router;
