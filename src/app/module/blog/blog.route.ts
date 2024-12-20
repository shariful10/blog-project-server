import express from "express";
import auth from "../../middleware/auth";
import validateRequest from "../../middleware/validateRequest";
import { USER_ROLE } from "../user/user.const";
import { BlogControllers } from "./blog.controller";
import { BlogValidations } from "./blog.validation";

const router = express.Router();

router.post(
  "/",
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.createBlogValidationSchema),
  BlogControllers.createBlog,
);

router.patch(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.updateBlog,
);

router.get("/", BlogControllers.getAllBlogs);

router.delete(
  "/:id",
  auth(USER_ROLE.user),
  validateRequest(BlogValidations.updateBlogValidationSchema),
  BlogControllers.deleteBlog,
);

export const BlogRoutes = router;
