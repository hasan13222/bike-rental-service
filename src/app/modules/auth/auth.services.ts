import bcrypt from 'bcrypt';
import { TUser, TUserLoginDetails } from '../user/user.interface';
import { User } from '../user/user.model';
import config from '../../config';
import AppError from '../../errors/AppError';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';

const createUserIntoDB = async (payload: TUser) => {
  const newUser = payload;
  newUser.role = 'user';
  const hashedPassword = await bcrypt.hash(
    newUser.password,
    Number(config.bcrypt_salt_rounds),
  );
  newUser.password = hashedPassword;
  const result = await User.create(newUser);
  return result;
};

const loginAuth = async (payload: TUserLoginDetails) => {
  //  check if user exists
  const user = await User.findOne({ email: payload.email }).select('+password');
  if (!user) {
    throw new AppError(StatusCodes.NOT_FOUND, 'User not found');
  }

  const isPasswordMatched = await bcrypt.compare(
    payload.password,
    user.password,
  );
  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, 'Password not matched');
  }

  const jwtPayload = {
    role: user.role,
    email: user.email,
  };

  const token = jwt.sign(jwtPayload, config.access_token_secret as string);

  return { user, token };
};



export const AuthServices = {
  createUserIntoDB,
  loginAuth,
};
