import mongoose from 'mongoose';
import { TBooking } from './booking.interface';
import { Booking } from './booking.model';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import { getBookingUpdate } from './booking.utils';

const createBookingIntoDB = async (userEmail: string, payload: TBooking) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  //   check bike is available or not
  const bike = await Bike.findById(payload.bikeId);
  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }
  if (!bike.isAvailable) {
    throw new AppError(StatusCodes.CONFLICT, 'Bike is not available');
  }

  const newBooking = { ...payload, userId: user?._id };

  const session = await mongoose.startSession();

  // session to create booking and bike availability to false
  try {
    session.startTransaction();

    // create booking
    const result = await Booking.create([newBooking], { session });
    if (result.length <= 0) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to book the bike');
    }

    // update bike availability to false
    const updateBike = await Bike.findByIdAndUpdate(
      payload.bikeId,
      { isAvailable: false },
      { session },
    );
    if (!updateBike) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to update the bike availability',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Booking failed ' + err);
  }
};

const updateBookingIntoDB = async (bookingId: string) => {
  const booking = await Booking.findById(bookingId);
  if (!booking) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Booking not found');
  }
  if (booking.isReturned) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike already returned');
  }

  const bike = await Bike.findById(booking.bikeId);
  if (!bike) {
    throw new AppError(StatusCodes.NOT_FOUND, 'Bike not found');
  }

  const session = await mongoose.startSession();

  // session to create booking and bike availability to false
  try {
    session.startTransaction();

    // update booking
    const updateBooking = getBookingUpdate(booking, bike);
    const result = await Booking.findByIdAndUpdate(bookingId, updateBooking, {
      session,
      new: true,
    });
    if (!result) {
      throw new AppError(StatusCodes.BAD_REQUEST, 'Failed to book the bike');
    }

    // update bike availability to true
    const updateBike = await Bike.findByIdAndUpdate(
      booking?.bikeId,
      { isAvailable: true },
      { session },
    );
    if (!updateBike) {
      throw new AppError(
        StatusCodes.BAD_REQUEST,
        'Failed to update the bike availability',
      );
    }

    await session.commitTransaction();
    await session.endSession();

    return result;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Booking failed ' + err);
  }
};

const getUserRentalsFromDB = async (userEmail: string) => {
  const user = await User.findOne({ email: userEmail });
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const result = await Booking.find({ userId: user._id });

  return result;
};

export const BookingServices = {
  createBookingIntoDB,
  updateBookingIntoDB,
  getUserRentalsFromDB,
};
