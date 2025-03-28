"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Review = void 0;
const mongoose_1 = require("mongoose");
const reviewSchema = new mongoose_1.Schema({
    review: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    bikeId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Bike'
    },
    bookingId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: 'Booking'
    },
}, {
    timestamps: true,
});
exports.Review = (0, mongoose_1.model)('Review', reviewSchema);
