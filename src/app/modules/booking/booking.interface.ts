import { Types } from 'mongoose';

export interface TBooking {
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  startTime: Date;
  returnTime: Date | null;
  totalCost: number;
  discount: number;
  isReturned: boolean;
  status?: "paid" | "unpaid"
}
