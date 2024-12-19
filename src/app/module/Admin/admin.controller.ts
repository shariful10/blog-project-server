import catchAsync from "../../utils/catchAsync";
import { AdminServices } from "./admin.service";

const blockUser = catchAsync(async (req, res) => {
  const { userId } = req.params;

  await AdminServices.blockUserIntoDB(userId);

  res.status(200).json({
    success: true,
    message: "User blocked successfully",
    statusCode: 200,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;

  await AdminServices.deleteBlogFromDB(id);

  res.status(200).json({
    success: true,
    message: "Blog deleted successfully",
    statusCode: 200,
  });
});

export const AdminControllers = {
  blockUser,
  deleteBlog,
};
