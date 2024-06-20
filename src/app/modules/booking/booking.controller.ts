import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookingServices } from './booking.service';

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req?.user?.email;
  const result = await BookingServices.createBookingIntoDB(userEmail, req.body);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Booking Added successfully',
    data: result,
  });
});

const returnBike = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const result = await BookingServices.updateBookingIntoDB(bookingId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Bike Returned successfully',
    data: result,
  });
});

const getUserBooking = catchAsync(async (req: Request, res: Response) => {
  const userEmail = req?.user?.email;
  const result = await BookingServices.getUserRentalsFromDB(userEmail);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Rentals Retrieved successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  returnBike,
  getUserBooking,
};
