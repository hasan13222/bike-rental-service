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
exports.AuthServices = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../user/user.model");
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const http_status_codes_1 = require("http-status-codes");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newUser = payload;
    const hashedPassword = yield bcrypt_1.default.hash(newUser.password, Number(config_1.default.bcrypt_salt_rounds));
    newUser.password = hashedPassword;
    const result = yield user_model_1.User.create(newUser);
    return result;
});
const loginAuth = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //  check if user exists
    const user = yield user_model_1.User.findOne({ email: payload.email }).select('+password');
    if (!user) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.NOT_FOUND, 'User not found');
    }
    const isPasswordMatched = yield bcrypt_1.default.compare(payload.password, user.password);
    if (!isPasswordMatched) {
        throw new AppError_1.default(http_status_codes_1.StatusCodes.BAD_REQUEST, 'Password not matched');
    }
    const jwtPayload = {
        role: user.role,
        email: user.email,
    };
    const token = jsonwebtoken_1.default.sign(jwtPayload, config_1.default.access_token_secret);
    return { user, token };
});
exports.AuthServices = {
    createUserIntoDB,
    loginAuth,
};
