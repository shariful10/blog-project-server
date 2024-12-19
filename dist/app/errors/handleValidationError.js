"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError = (err) => {
    const val = Object.values(err.errors)[0];
    const error = {
        path: val === null || val === void 0 ? void 0 : val.path,
        details: val === null || val === void 0 ? void 0 : val.message,
    };
    const statusCode = 400;
    return {
        statusCode,
        details: "Validation error",
        error,
    };
};
exports.default = handleValidationError;
