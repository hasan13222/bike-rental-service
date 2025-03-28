"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const booking_model_1 = require("./booking.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const bike_model_1 = require("../bike/bike.model");
const user_model_1 = require("../user/user.model");
const booking_utils_1 = require("./booking.utils");
const createBookingIntoDB = (userEmail, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    //   check bike is available or not
    const bike = yield bike_model_1.Bike.findById(payload.bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Bike not found');
    }
    if (!bike.isAvailable) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, 'Bike is not available');
    }
    const newBooking = Object.assign(Object.assign({}, payload), { userId: user === null || user === void 0 ? void 0 : user._id });
    const session = yield mongoose_1.default.startSession();
    // session to create booking and bike availability to false
    try {
        session.startTransaction();
        // create booking
        const result = yield booking_model_1.Booking.create([newBooking], { session });
        if (result.length <= 0) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to book the bike');
        }
        // update bike availability to false
        const updateBike = yield bike_model_1.Bike.findByIdAndUpdate(payload.bikeId, { isAvailable: false }, { session });
        if (!updateBike) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update the bike availability');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Booking failed ' + err);
    }
});
const updateBookingIntoDB = (bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const booking = yield booking_model_1.Booking.findById(bookingId);
    if (!booking) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Booking not found');
    }
    if (booking.isReturned) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Bike already returned');
    }
    const bike = yield bike_model_1.Bike.findById(booking.bikeId);
    if (!bike) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'Bike not found');
    }
    const session = yield mongoose_1.default.startSession();
    // session to create booking and bike availability to false
    try {
        session.startTransaction();
        // update booking
        const updateBooking = (0, booking_utils_1.getBookingUpdate)(booking, bike);
        const result = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, updateBooking, {
            session,
            new: true,
        });
        if (!result) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to book the bike');
        }
        // update bike availability to true
        const updateBike = yield bike_model_1.Bike.findByIdAndUpdate(booking === null || booking === void 0 ? void 0 : booking.bikeId, { isAvailable: true }, { session });
        if (!updateBike) {
            throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Failed to update the bike availability');
        }
        yield session.commitTransaction();
        yield session.endSession();
        return result;
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw new Error('Booking failed ' + err);
    }
});
const getUserRentalsFromDB = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.findOne({ email: userEmail });
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const result = yield booking_model_1.Booking.find({ userId: user._id }).populate({
        path: 'bikeId',
        select: 'name _id',
    });
    return result;
});
const getAllRentalsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.find({ status: 'unpaid' }).populate({
        path: 'bikeId',
        select: 'name',
    });
    return result;
});
const bookingPaymentIntoDB = (bookingId, discount) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, {
        status: 'paid',
        discount: discount,
    });
    return result;
});
const fixDiscountIntoDB = (bookingId, discount) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_model_1.Booking.findByIdAndUpdate(bookingId, {
        discount: discount,
    });
    return result;
});
exports.BookingServices = {
    createBookingIntoDB,
    updateBookingIntoDB,
    getUserRentalsFromDB,
    getAllRentalsFromDB,
    bookingPaymentIntoDB,
    fixDiscountIntoDB,
};
