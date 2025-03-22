"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("../user/user.validation");
const auth_controller_1 = require("./auth.controller");
const auth_1 = require("../../middleware/auth");
const router = express_1.default.Router();
router.post('/signup', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidations.createUserValidationSchema), auth_controller_1.AuthControllers.signup);
router.post('/login', (0, validateRequest_1.validateRequest)(user_validation_1.UserValidations.loginUserValidationSchema), auth_controller_1.AuthControllers.login);
router.get('/check-login', (0, auth_1.verifyCookieToken)(), auth_controller_1.AuthControllers.checkLogin());
router.post('/logout', auth_controller_1.AuthControllers.logout());
exports.AuthRoutes = router;
