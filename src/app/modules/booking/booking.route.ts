import express from 'express';
import { validateRequest } from '../../middleware/validateRequest';
import { verifyToken } from '../../middleware/auth';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
const router = express.Router();

router.post(
  '/',
  verifyToken(),
  validateRequest(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);
router.put('/:id/return', verifyToken('admin'), BookingControllers.returnBike);

router.get('/', verifyToken(), BookingControllers.getUserBooking);

export const BookingRoutes = router;
