import { TBike } from './bike.interface';
import { Bike } from './bike.model';

const createBikeIntoDB = async (payload: TBike) => {
  const newBike = payload;
  const result = await Bike.create(newBike);
  return result;
};

const getAllBikeFromDB = async () => {
  const result = await Bike.find();
  return result;
};

const updateBikeIntoDB = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBikeFromDB = async (id: string) => {
  const result = await Bike.findByIdAndDelete(id);
  return result;
};

export const BikeServices = {
  createBikeIntoDB,
  getAllBikeFromDB,
  updateBikeIntoDB,
  deleteBikeFromDB,
};
