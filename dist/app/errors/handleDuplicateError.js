"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleDuplicateError = (err) => {
    // Extract value within double quotes using regex
    const match = err.message.match(/"([^"]*)"/);
    const extractedMessage = match && match[1];
    const error = {
        path: "",
        details: `${extractedMessage} already exists!`,
    };
    const statusCode = 400;
    return {
        statusCode,
        details: "Invalid ID",
        error,
    };
};
exports.default = handleDuplicateError;
