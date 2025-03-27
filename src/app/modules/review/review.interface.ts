import { Types } from "mongoose";

export interface TReview {
  review: string;
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  bookingId: Types.ObjectId;
  rating: number;
}
