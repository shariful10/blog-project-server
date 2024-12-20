import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
  const user = await AuthServices.createUserIntoDB(req.body);

  const { _id, name, email } = user;

  const result = { _id, name, email };

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: "User registered successfully",
    data: result,
  });
});

const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: "Login successful",
    data: result,
  });
});

export const AuthControllers = {
  createUser,
  loginUser,
};
