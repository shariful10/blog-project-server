import config from "../../config";
import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { TLoginUser } from "./auth.interface";
import { createToken } from "./auth.utils";

const createUserIntoDB = async (payload: TUser) => {
  const result = await User.create(payload);
  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await User.isUserExists(payload?.email);

  // Checking if the user is exist
  if (!user) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found!");
  }

  // Checking if the user is blocked
  const userStatus = user?.isBlocked;

  if (userStatus) {
    throw new AppError(httpStatusCode.FORBIDDEN, "This user is blocked!");
  }

  // Checking if the password is correct
  if (!(await User.isPasswordMatched(payload?.password, user.password))) {
    throw new AppError(httpStatusCode.FORBIDDEN, "Password is incorrect!");
  }

  // Create token and send it to the client
  const jwtPayload = {
    email: user.email,
    role: user.role as string,
  };

  const token = createToken(
    jwtPayload,
    config.jwtAccessSecret as string,
    config.jwtAccessExpiresIn as string,
  );

  return {
    token,
  };
};

export const AuthServices = {
  createUserIntoDB,
  loginUser,
};
