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

export const BlogControllers = {
  createBlog,
};
