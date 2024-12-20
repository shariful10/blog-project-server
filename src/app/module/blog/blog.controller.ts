import catchAsync from "../../utils/catchAsync";
import { httpStatusCode } from "../../utils/httpStatusCode";
import sendResponse from "../../utils/sendResponse";
import { TUser } from "../user/user.interface";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const user = req.user as TUser;

  const result = await BlogServices.createBlogIntoDB(req.body, user);

  sendResponse(res, {
    statusCode: httpStatusCode.CREATED,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as TUser;

  const result = await BlogServices.updateBlogIntoDB(id, user, req.body);

  sendResponse(res, {
    statusCode: httpStatusCode.OK,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const user = req.user as TUser;

  await BlogServices.deleteBlogFromDB(id, user);

  res.status(httpStatusCode.OK).json({
    statusCode: httpStatusCode.OK,
    success: true,
    message: "Blog deleted successfully",
  });
});

export const BlogControllers = {
  createBlog,
  getAllBlogs,
  updateBlog,
  deleteBlog,
};
