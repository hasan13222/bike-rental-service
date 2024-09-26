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
exports.BookingControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const booking_service_1 = require("./booking.service");
const stripe_1 = __importDefault(require("stripe"));
const config_1 = __importDefault(require("../../config"));
const stripeinstance = new stripe_1.default(config_1.default.stripe_secret);
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
const doPayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bodyData = req.body;
    const discount = (bodyData === null || bodyData === void 0 ? void 0 : bodyData.discount) || 0;
    const amountToPay = (bodyData.totalCost - discount).toFixed(2);
    const paymentIntent = yield stripeinstance.paymentIntents.create({
        amount: Number(amountToPay) * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        description: 'Software development services',
        shipping: {
            name: bodyData.name,
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
    });
    const result = yield booking_service_1.BookingServices.bookingPaymentIntoDB(req.params.id, discount);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Payment done successfully',
        data: {
            clientSecret: paymentIntent.client_secret,
            result
        },
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
const getAllBooking = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield booking_service_1.BookingServices.getAllRentalsFromDB();
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Rentals Retrieved successfully',
        data: result,
    });
}));
const fixDiscount = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bookingId = req.params.id;
    const result = yield booking_service_1.BookingServices.fixDiscountIntoDB(bookingId, req.body.discount);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Rentals Retrieved successfully',
        data: result,
    });
}));
const takeAdvancePayment = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newRequest = req.body;
    const paymentIntent = yield stripeinstance.paymentIntents.create({
        amount: 100 * 100,
        currency: 'usd',
        payment_method_types: ['card'],
        description: 'Software development services',
        shipping: {
            name: newRequest.name,
            address: {
                line1: '510 Townsend St',
                postal_code: '98140',
                city: 'San Francisco',
                state: 'CA',
                country: 'US',
            },
        },
    });
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Payment done successfully',
        data: {
            clientSecret: paymentIntent.client_secret,
        },
    });
}));
exports.BookingControllers = {
    createBooking,
    returnBike,
    getUserBooking,
    takeAdvancePayment,
    getAllBooking,
    doPayment,
    fixDiscount
};
