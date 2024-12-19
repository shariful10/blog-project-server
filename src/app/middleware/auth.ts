import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import AppError from "../errors/AppError";
import { TUserRole } from "../module/user/user.interface";
import User from "../module/user/user.model";
import catchAsync from "../utils/catchAsync";

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req, _res, next) => {
    const token = req.headers.authorization;

    // If the token send from the client
    if (!token) {
      throw new AppError(401, "You are not authorized");
    }

    // Check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwtAccessSecret as string,
    ) as JwtPayload;

    const { role, email } = decoded;

    const user = await User.isUserExists(email);

    // Checking if the user is exist
    if (!user) {
      throw new AppError(404, "User not found!");
    }

    // Checking if the user is blocked
    const userStatus = user?.isBlocked;

    if (userStatus) {
      throw new AppError(403, "This user is blocked!");
    }

    // if (
    //   user.passwordChangedAt &&
    //   User.isJWTIssuedBeforePasswordChanged(
    //     user.passwordChangedAt,
    //     iat as number,
    //   )
    // ) {
    //   throw new AppError(401, "You are not authorized");
    // }

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, "You are not authorized");
    }

    req.user = decoded as JwtPayload;

    next();
  });
};

export default auth;
