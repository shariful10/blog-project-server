import express from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../user/user.const";

const router = express.Router();

router.post(
  "/users/:userId/block",
  auth(USER_ROLE.admin),
  // BlogControllers.createBlog,
);

export const AdminRoutes = router;
