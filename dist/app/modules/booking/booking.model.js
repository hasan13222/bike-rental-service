"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const bookingSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
exports.Booking = (0, mongoose_1.model)('Booking', bookingSchema);
