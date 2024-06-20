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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const booking_service_1 = require("./booking.service");
const createBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const userEmail = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.email;
    const result = yield booking_service_1.BookingServices.createBookingIntoDB(userEmail, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Booking Added successfully',
        data: result,
    });
}));
const returnBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const result = yield booking_service_1.BookingServices.updateBookingIntoDB(bookingId);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Bike Returned successfully',
        data: result,
    });
}));
const getUserBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const userEmail = (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.email;
    const result = yield booking_service_1.BookingServices.getUserRentalsFromDB(userEmail);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Rentals Retrieved successfully',
        data: result,
    });
}));
exports.BookingControllers = {
    createBooking,
    returnBike,
    getUserBooking,
};
