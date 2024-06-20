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
exports.AuthControllers = void 0;
const catchAsync_1 = require("../../utils/catchAsync");
const sendResponse_1 = require("../../utils/sendResponse");
const auth_services_1 = require("./auth.services");
const http_status_codes_1 = require("http-status-codes");
const config_1 = __importDefault(require("../../config"));
const signup = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.createUserIntoDB(req.body);
    const data = Object.assign(result);
    delete data.password;
    (0, sendResponse_1.sendResponse)(res, {
        status: http_status_codes_1.StatusCodes.CREATED,
        message: 'User registered successfully',
        data: data,
    });
}));
const login = (0, catchAsync_1.catchAsync)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield auth_services_1.AuthServices.loginAuth(req.body);
    const { token, user } = result;
    res.cookie('token', token, {
        secure: config_1.default.node_env === 'production',
        httpOnly: true,
    });
    (0, sendResponse_1.sendAuthResponse)(res, {
        status: http_status_codes_1.StatusCodes.OK,
        token,
        message: 'User Logged In successfully',
        data: user,
    });
}));
exports.AuthControllers = {
    signup,
    login,
};
