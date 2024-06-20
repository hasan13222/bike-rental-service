import { User } from '../user/user.model';
import { TUser } from './user.interface';

const getUserFromDB = async (email: string) => {
  const result = await User.findOne({ email: email }).select("+");
  return result;
};

const updateUserIntoDB = async (email: string, payload: Pick<TUser, 'name' | 'address' | 'phone'>) => {
  const result = await User.findOneAndUpdate({ email: email }, payload, {new: true});
  return result;
};

export const UserServices = {
  getUserFromDB,
  updateUserIntoDB
};
