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
exports.ReviewServices = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const review_model_1 = require("./review.model");
const createReviewIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isAlreadyReviewed = yield review_model_1.Review.findOne({ bookingId: payload.bookingId });
    if (isAlreadyReviewed) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.CONFLICT, "You have already given review for the ride");
    }
    const result = yield review_model_1.Review.create(payload);
    return result;
});
const getBikeReviewsFromDB = (bikeId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield review_model_1.Review.find({ bikeId }).populate({ path: 'userId', select: 'name' });
    return result;
});
exports.ReviewServices = {
    createReviewIntoDB,
    getBikeReviewsFromDB,
};
