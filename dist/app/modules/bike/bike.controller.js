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
exports.BikeControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const bike_service_1 = require("./bike.service");
const sendResponse_1 = require("../../utils/sendResponse");
const http_status_codes_1 = require("http-status-codes");
const createBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.createBikeIntoDB(req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'Bike Added successfully',
        data: result,
    });
}));
const getAllBikes = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bike_service_1.BikeServices.getAllBikeFromDB(req.query);
    if (result.length === 0) {
        (0, sendResponse_1.sendResponse)(res, {
            success: false,
            status: http_status_codes_1.StatusCodes.NOT_FOUND,
            message: 'No Data found',
            data: result,
        });
    }
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'All Bikes retrieved successfully',
        data: result,
    });
}));
const getSingleBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeId = req.params.id;
    const result = yield bike_service_1.BikeServices.getSingleFromDB(bikeId);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Single Bike retrieved successfully',
        data: result,
    });
}));
const updateBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeId = req.params.id;
    const result = yield bike_service_1.BikeServices.updateBikeIntoDB(bikeId, req.body);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Bike updated successfully',
        data: result,
    });
}));
const deleteBike = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const bikeId = req.params.id;
    const result = yield bike_service_1.BikeServices.deleteBikeFromDB(bikeId);
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        message: 'Bike deleted successfully',
        data: result,
    });
}));
exports.BikeControllers = {
    createBike,
    getAllBikes,
    updateBike,
    deleteBike,
    getSingleBike
};
