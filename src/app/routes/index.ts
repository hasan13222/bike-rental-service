import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { UserRoutes } from '../modules/user/user.route';
import { BikeRoutes } from '../modules/bike/bike.route';
import { BookingRoutes } from '../modules/booking/booking.route';
const router = express.Router();

const moduleRouters = [
  {
    path: '/auth',
    routes: AuthRoutes,
  },
  {
    path: '/users',
    routes: UserRoutes,
  },
  {
    path: '/bikes',
    routes: BikeRoutes,
  },
  {
    path: '/rentals',
    routes: BookingRoutes,
  },
];

moduleRouters.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
