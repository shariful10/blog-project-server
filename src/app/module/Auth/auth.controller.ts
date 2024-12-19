import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { AuthServices } from "./auth.service";

const createUser = catchAsync(async (req, res) => {
  const result = await AuthServices.createUserIntoDB(req.body);

  const responseData = {
    _id: result._id,
    name: result.name,
    email: result.email,
  };

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "User registered successfully",
    data: responseData,
  });
});

export const AuthControllers = {
  createUser,
};
