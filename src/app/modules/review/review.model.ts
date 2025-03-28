import { Schema, model } from 'mongoose';
import { TReview } from './review.interface';

const reviewSchema = new Schema<TReview>(
  {
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    bikeId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Bike'
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Booking'
    },
  },
  {
    timestamps: true,
  },
);

export const Review = model<TReview>('Review', reviewSchema);
