import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import Blog from "../blog/blog.model";
import User from "../user/user.model";

const blockUserIntoDB = async (id: string) => {
  const result = User.findByIdAndUpdate(id, { isBlocked: true });

  if (!result) {
    throw new AppError(httpStatusCode.NOT_FOUND, "User not found");
  }

  return result;
};

const deleteBlogFromDB = async (id: string) => {
  const result = await Blog.findByIdAndDelete(id);

  if (!result) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Blog not found");
  }

  return result;
};

export const AdminServices = {
  blockUserIntoDB,
  deleteBlogFromDB,
};
