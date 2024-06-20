import { StatusCodes } from 'http-status-codes';
import { sendResponse } from '../../utils/sendResponse';
import { Request, Response } from 'express';
import { UserServices } from './user.service';
import { catchAsync } from '../../utils/catchAsync';

const getUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getUserFromDB(req?.user?.email);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'User Profile retrieved successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.updateUserIntoDB(
    req?.user?.email,
    req.body,
  );
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Profile updated successfully',
    data: result,
  });
});

export const UserControllers = {
  getUser,
  updateUser,
};
