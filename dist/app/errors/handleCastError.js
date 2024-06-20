"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    return [
        {
            path: err === null || err === void 0 ? void 0 : err.path,
            message: err === null || err === void 0 ? void 0 : err.message,
        },
    ];
};
exports.default = handleCastError;
