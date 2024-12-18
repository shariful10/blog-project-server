"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidations = void 0;
const zod_1 = require("zod");
const createUserValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        name: zod_1.z
            .string({
            required_error: "Name is required",
            invalid_type_error: "Name must be a string",
        })
            .min(1, { message: "Name must be at least 1 character or more" }),
        email: zod_1.z
            .string({
            required_error: "Email is required",
            invalid_type_error: "Email must be a string",
        })
            .email({ message: "Email must be in a email format" }),
        password: zod_1.z
            .string({
            required_error: "Password is required",
            invalid_type_error: "Email must be a string",
        })
            .min(1, { message: "Password must be at least 1 character or more" }),
        role: zod_1.z
            .enum(["admin", "user"], {
            invalid_type_error: "Role must be a string",
            message: "Role must be one of the following characters: admin, user",
        })
            .optional()
            .default("user"),
        isBlocked: zod_1.z.boolean().optional().default(false),
    }),
});
exports.userValidations = {
    createUserValidationSchema,
};
