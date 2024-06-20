"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBookingUpdate = void 0;
const getBookingUpdate = (booking, bike) => {
    const returnTime = Date.now();
    const startTime = new Date(booking === null || booking === void 0 ? void 0 : booking.startTime).getTime();
    const totalCost = ((returnTime - startTime) / (1000 * 3600)) * bike.pricePerHour;
    return {
        returnTime: new Date(returnTime),
        totalCost: Number(totalCost.toFixed(2)),
        isReturned: true,
    };
};
exports.getBookingUpdate = getBookingUpdate;
