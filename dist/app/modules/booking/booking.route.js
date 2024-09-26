"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const auth_1 = require("../../middleware/auth");
const booking_validation_1 = require("./booking.validation");
const booking_controller_1 = require("./booking.controller");
const router = express_1.default.Router();
router.post('/', (0, auth_1.verifyToken)(), (0, validateRequest_1.validateRequest)(booking_validation_1.BookingValidations.createBookingValidationSchema), booking_controller_1.BookingControllers.createBooking);
router.put('/:id/return', (0, auth_1.verifyToken)('admin'), booking_controller_1.BookingControllers.returnBike);
// final payment
router.patch('/:id/pay', booking_controller_1.BookingControllers.doPayment);
router.patch('/:id/discount', booking_controller_1.BookingControllers.fixDiscount);
router.get('/', (0, auth_1.verifyToken)(), booking_controller_1.BookingControllers.getUserBooking);
router.get('/all', (0, auth_1.verifyToken)('admin'), booking_controller_1.BookingControllers.getAllBooking);
// advance payment
router.post('/payment', booking_controller_1.BookingControllers.takeAdvancePayment);
exports.BookingRoutes = router;
