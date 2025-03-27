import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { catchAsync } from '../../utils/catchAsync';
import { Request, Response } from 'express';
import { ReviewServices } from './review.service';

const createReview = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.createReviewIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Review Added successfully',
    data: result,
  });
});

const getBikeReviews = catchAsync(async (req: Request, res: Response) => {
  const result = await ReviewServices.getBikeReviewsFromDB(req.params.bikeId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Review Retrieved successfully',
    data: result,
  });
});



export const ReviewControllers = {
  createReview,
  getBikeReviews,
};
