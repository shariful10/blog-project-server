import { z } from "zod";

const createUserValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(1, { message: "Name must be at least 1 character or more" }),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email({ message: "Email must be in a email format" }),
    password: z
      .string({
        required_error: "Password is required",
        invalid_type_error: "Email must be a string",
      })
      .min(1, { message: "Password must be at least 1 character or more" }),
    role: z
      .enum(["admin", "user"], {
        invalid_type_error: "Role must be a string",
        message: "Role must be one of the following characters: admin, user",
      })
      .optional()
      .default("user"),
    isBlocked: z.boolean().optional().default(false),
  }),
});

export const userValidations = {
  createUserValidationSchema,
};
