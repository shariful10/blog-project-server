import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BlogServices } from "./blog.service";

const createBlog = catchAsync(async (req, res) => {
  const token = req.headers.authorization;
  const blog = await BlogServices.createBlogIntoDB(req.body, token as string);

  const { _id, title, content, author } = blog;

  const result = {
    _id,
    title,
    content,
    author,
  };

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Blog created successfully",
    data: result,
  });
});

const getAllBlogs = catchAsync(async (req, res) => {
  const result = await BlogServices.getAllBlogsFromDB();

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blogs fetched successfully",
    data: result,
  });
});

const updateBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const result = await BlogServices.updateBlogIntoDB(
    id,
    token as string,
    req.body,
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Blog updated successfully",
    data: result,
  });
});

const deleteBlog = catchAsync(async (req, res) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  await BlogServices.deleteBlogFromDB(id, token as string);

  res.status(200).json({
    statusCode: 200,
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
