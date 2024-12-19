import { z } from "zod";

const createBlogValidationSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    }),
    content: z.string({
      required_error: "Content is required",
      invalid_type_error: "Content must be a string",
    }),
    // author: z.string({
    //   required_error: "Author is required",
    //   invalid_type_error: "Author must be a string",
    // }),
    isPublished: z.boolean().optional().default(true),
  }),
});

export const BlogValidations = {
  createBlogValidationSchema,
};
