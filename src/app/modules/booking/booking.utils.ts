import { TBike } from '../bike/bike.interface';
import { TBooking } from './booking.interface';

export const getBookingUpdate = (
  booking: TBooking,
  bike: TBike,
): Pick<TBooking, 'returnTime' | 'totalCost' | 'isReturned'> => {
  const returnTime = Date.now();
  const startTime = new Date(booking?.startTime).getTime();
  const totalCost =
    ((returnTime - startTime) / (1000 * 3600)) * bike.pricePerHour;

  return {
    returnTime: new Date(returnTime),
    totalCost: Number(totalCost.toFixed(2)),
    isReturned: true,
  };
};
