import { Schema, model } from 'mongoose';
import { TBooking } from './booking.interface';

const bookingSchema = new Schema<TBooking>({
  userId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  bikeId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'Bike'
  },
  startTime: {
    type: Date,
    required: true,
  },
  returnTime: {
    type: Date,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0,
  },
  isReturned: {
    type: Boolean,
    default: false,
  },
  status: {
    type: String,
    default: "unpaid"
  }
});

export const Booking = model<TBooking>('Booking', bookingSchema);
