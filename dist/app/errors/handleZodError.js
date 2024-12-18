"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleZodError = (err) => {
    const error = err.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            details: issue.message,
        };
    });
    const statusCode = 400;
    return {
        statusCode,
        details: "Validation error",
        error,
    };
};
exports.default = handleZodError;
