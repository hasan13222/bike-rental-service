"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRoutes = void 0;
const auth_1 = require("../../middleware/auth");
const review_controller_1 = require("./review.controller");
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.verifyToken)(), review_controller_1.ReviewControllers.createReview);
router.get('/:bikeId', review_controller_1.ReviewControllers.getBikeReviews);
exports.ReviewRoutes = router;
