import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.const";
import { BlogControllers } from "./blog.controller";
import { BlogValidations } from "./blog.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.admin, USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

export const BlogRoutes = router;
