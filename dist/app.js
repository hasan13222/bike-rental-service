"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const routes_1 = __importDefault(require("./app/routes"));
const notFoundHandler_1 = require("./app/middleware/notFoundHandler");
const globalErrorHander_1 = require("./app/middleware/globalErrorHander");
const app = (0, express_1.default)();
// cors middleware
const corsOptions = {
    origin: ['http://localhost:5173', 'https://bike-rental-frontend-eight.vercel.app'],
    credentials: true,
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
// json parser
app.use(express_1.default.json());
// cookie parser
app.use((0, cookie_parser_1.default)());
// application routes
app.use('/api', routes_1.default);
app.get('/', (req, res) => {
    res.send('Hello Biker! Welcome to the Biker Rental Service.');
});
// not found route handler
app.all('*', notFoundHandler_1.notFoundHandler);
// global error handler
app.use(globalErrorHander_1.globalErrorHandler);
exports.default = app;
