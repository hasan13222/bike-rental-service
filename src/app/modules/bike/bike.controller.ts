import { Request, Response } from 'express';
import { catchAsync } from '../../utils/catchAsync';
import { BikeServices } from './bike.service';
import { sendResponse } from '../../utils/sendResponse';
import { StatusCodes } from 'http-status-codes';

const createBike = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.createBikeIntoDB(req.body);
  sendResponse(res, {
    status: StatusCodes.CREATED,
    message: 'Bike Added successfully',
    data: result,
  });
});

const getAllBikes = catchAsync(async (req: Request, res: Response) => {
  const result = await BikeServices.getAllBikeFromDB();
  if (result.length === 0) {
    sendResponse(res, {
      success: false,
      status: StatusCodes.NOT_FOUND,
      message: 'No Data found',
      data: result,
    });
  }
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'All Bikes retrieved successfully',
    data: result,
  });
});

const updateBike = catchAsync(async (req: Request, res: Response) => {
  const bikeId = req.params.id;
  const result = await BikeServices.updateBikeIntoDB(bikeId, req.body);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Bike updated successfully',
    data: result,
  });
});

const deleteBike = catchAsync(async (req: Request, res: Response) => {
  const bikeId = req.params.id;
  const result = await BikeServices.deleteBikeFromDB(bikeId);
  sendResponse(res, {
    status: StatusCodes.OK,
    message: 'Bike deleted successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
  getAllBikes,
  updateBike,
  deleteBike,
};
