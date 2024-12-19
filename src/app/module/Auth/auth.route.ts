import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";
import { AuthValidations } from "./auth.validation";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

router.post(
  "/login",
  validateRequest(AuthValidations.loginValidationSchema),
  AuthControllers.loginUser,
);

export const AuthRoutes = router;
