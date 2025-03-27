import { StatusCodes } from 'http-status-codes';
import AppError from '../../errors/AppError';
import { TReview } from './review.interface';
import { Review } from './review.model';

const createReviewIntoDB = async (payload: TReview) => {
  const isAlreadyReviewed = await Review.findOne({bookingId: payload.bookingId});
  if(isAlreadyReviewed){
    throw new AppError(StatusCodes.CONFLICT, "You have already given review for the ride")
  }
  const result = await Review.create(payload);
  return result;
};

const getBikeReviewsFromDB = async (bikeId: string) => {
  const result = await Review.find({bikeId}).populate({path: 'userId', select: 'name'});
  return result;
};

export const ReviewServices = {
  createReviewIntoDB,
  getBikeReviewsFromDB,
};
