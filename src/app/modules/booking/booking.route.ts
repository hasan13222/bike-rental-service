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

// final payment
router.patch('/:id/pay', BookingControllers.doPayment);
router.patch('/:id/discount', BookingControllers.fixDiscount);

router.get('/', verifyToken(), BookingControllers.getUserBooking);
router.get('/all', verifyToken('admin'), BookingControllers.getAllBooking);

// advance payment
router.post('/payment', BookingControllers.takeAdvancePayment);

export const BookingRoutes = router;
