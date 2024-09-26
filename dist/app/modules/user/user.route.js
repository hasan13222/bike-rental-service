"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const auth_1 = require("../../middleware/auth");
const validateRequest_1 = require("../../middleware/validateRequest");
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get('/', (0, auth_1.verifyToken)('admin'), user_controller_1.UserControllers.getAllUser);
router.delete('/:userId', (0, auth_1.verifyToken)('admin'), user_controller_1.UserControllers.deleteUser);
router.patch('/:id/promote', (0, auth_1.verifyToken)('admin'), user_controller_1.UserControllers.promoteUser());
router.get('/me', (0, auth_1.verifyToken)(), user_controller_1.UserControllers.getUser);
router.put('/me', (0, auth_1.verifyToken)(), (0, validateRequest_1.validateRequest)(user_validation_1.UserValidations.updateUserValidationSchema), user_controller_1.UserControllers.updateUser);
exports.UserRoutes = router;
