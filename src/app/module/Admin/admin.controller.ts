import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { AdminServices } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await AdminServices.blockUserIntoDB(userId);

  res.status(httpStatusCode.OK).json({
    success: true,
    message: "User blocked successfully",
    statusCode: httpStatusCode.OK,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminServices.deleteBlogFromDB(id);

  res.status(httpStatusCode.OK).json({
    success: true,
    message: "Blog deleted successfully",
    statusCode: httpStatusCode.OK,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
