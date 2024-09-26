import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';
import { BookingServices } from './booking.service';
import stripe from 'stripe'
import config from '../../config';

const stripeinstance = new stripe(config.stripe_secret as string);

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

const doPayment = catchAsync(async (req: Request, res: Response) => {
  const bodyData = req.body;
  const discount = bodyData?.discount || 0;
  const amountToPay = (bodyData.totalCost - discount).toFixed(2)
  const paymentIntent = await stripeinstance.paymentIntents.create({
    amount: Number(amountToPay) * 100,
    currency: 'usd',
    payment_method_types: ['card'],
    description: 'Software development services',
    shipping: {
      name: bodyData.name,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
  });

  const result = await BookingServices.bookingPaymentIntoDB(req.params.id, discount)

  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Payment done successfully',
    data: {
      clientSecret: paymentIntent.client_secret,
      result
    },
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

const getAllBooking = catchAsync(async (req: Request, res: Response) => {
  const result = await BookingServices.getAllRentalsFromDB();
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Rentals Retrieved successfully',
    data: result,
  });
});

const fixDiscount = catchAsync(async (req: Request, res: Response) => {
  const bookingId = req.params.id;
  const result = await BookingServices.fixDiscountIntoDB(bookingId, req.body.discount);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Rentals Retrieved successfully',
    data: result,
  });
});

const takeAdvancePayment = catchAsync(async (req: Request, res: Response) => {
  const newRequest = req.body;
  const paymentIntent = await stripeinstance.paymentIntents.create({
    amount: 100 * 100,
    currency: 'usd',
    payment_method_types: ['card'],
    description: 'Software development services',
    shipping: {
      name: newRequest.name,
      address: {
        line1: '510 Townsend St',
        postal_code: '98140',
        city: 'San Francisco',
        state: 'CA',
        country: 'US',
      },
    },
  });

  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Payment done successfully',
    data: {
      clientSecret: paymentIntent.client_secret,
    },
  });
});

export const BookingControllers = {
  createBooking,
  returnBike,
  getUserBooking,
  takeAdvancePayment,
  getAllBooking,
  doPayment,
  fixDiscount
};
