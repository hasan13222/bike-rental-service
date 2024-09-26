import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { BikeValidations } from './bike.validation';
import { BikeControllers } from './bike.controller';
import { verifyToken } from '../../middleware/auth';
const router = express.Router();

router.post(
  '/',
  verifyToken('admin'),
  validateRequest(BikeValidations.createBikeValidationSchema),
  BikeControllers.createBike,
);
router.get('/', BikeControllers.getAllBikes);
router.get('/:id', BikeControllers.getSingleBike);
router.put(
  '/:id',
  verifyToken('admin'),
  validateRequest(BikeValidations.updateBikeValidationSchema),
  BikeControllers.updateBike,
);

router.delete('/:id', verifyToken('admin'), BikeControllers.deleteBike);

export const BikeRoutes = router;
