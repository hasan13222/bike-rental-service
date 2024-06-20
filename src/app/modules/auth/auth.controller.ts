import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { sendAuthResponse, sendResponse } from '../../utils/sendResponse';
import { AuthServices } from './auth.services';
import { StatusCodes } from 'http-status-codes';
import config from '../../config';

const signup = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.createUserIntoDB(req.body);
  const data = Object.assign(result);
  delete data.password;
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'User registered successfully',
    data: data,
  });
});

const login = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthServices.loginAuth(req.body);
  const { token, user } = result;
  res.cookie('token', token, {
    secure: config.node_env === 'production',
    httpOnly: true,
  });
  sendAuthResponse(res, {
    status: StatusCodes.OK,
    token,
    message: 'User Logged In successfully',
    data: user,
  });
});

export const AuthControllers = {
  signup,
  login,
};
