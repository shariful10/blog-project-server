import express from "express";
import validateRequest from "../../middleware/validateRequest";
import { userValidations } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/register",
  validateRequest(userValidations.createUserValidationSchema),
  AuthControllers.createUser,
);

export const AuthRoutes = router;
