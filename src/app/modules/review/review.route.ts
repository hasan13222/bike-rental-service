import { verifyToken } from '../../middleware/auth';
import { ReviewControllers } from './review.controller';
import express from 'express';
const router = express.Router();

router.post('/', verifyToken(), ReviewControllers.createReview);
router.get('/:bikeId', ReviewControllers.getBikeReviews);

export const ReviewRoutes = router;
