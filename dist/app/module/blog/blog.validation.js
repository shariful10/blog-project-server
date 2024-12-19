"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogValidations = void 0;
const zod_1 = require("zod");
const createBlogValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: "Title is required",
            invalid_type_error: "Title must be a string",
        }),
        content: zod_1.z.string({
            required_error: "Content is required",
            invalid_type_error: "Content must be a string",
        }),
        // author: z.string({
        //   required_error: "Author is required",
        //   invalid_type_error: "Author must be a string",
        // }),
        isPublished: zod_1.z.boolean().optional().default(true),
    }),
});
exports.BlogValidations = {
    createBlogValidationSchema,
};
