"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleCastError = (err) => {
    const error = {
        path: err === null || err === void 0 ? void 0 : err.path,
        details: err === null || err === void 0 ? void 0 : err.message,
    };
    const statusCode = 400;
    return {
        statusCode,
        details: "Invalid ID",
        error,
    };
};
exports.default = handleCastError;
