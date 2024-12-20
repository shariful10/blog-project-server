import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { httpStatusCode } from "../../utils/httpStatusCode";
import { TUser } from "../user/user.interface";
import User from "../user/user.model";
import { searchableFields } from "./blog.const";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB = async (payload: TBlog, user: TUser) => {
  const userData = await User.findOne({ email: user.email }).select(
    "-password",
  );

  if (userData?.role !== "user") {
    throw new AppError(
      httpStatusCode.FORBIDDEN,
      "You are not authorized to create a blog",
    );
  }

  const newPayload = { ...payload, author: userData?._id };

  const result = (await Blog.create(newPayload)).populate("author");
  return result;
};

const getAllBlogsFromDB = async (query: Record<string, unknown>) => {
  const blogQuery = new QueryBuilder(
    Blog.find().select("-__v").populate("author"),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort();

  const result = await blogQuery.modelQuery;

  return result;
};

const updateBlogIntoDB = async (
  id: string,
  user: TUser,
  payload: Partial<TBlog>,
) => {
  const userData = await User.findOne({ email: user.email }).select(
    "-password",
  );

  const blog = await Blog.findById(id);

  // Check if the blog exists
  if (!blog) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Blog not found");
  }

  // Checking if this user owns this blog
  if (!blog?.author.equals(userData?._id)) {
    throw new AppError(403, "You are not authorized to update this blog");
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  })
    .select("-__v")
    .populate("author");

  return result;
};

const deleteBlogFromDB = async (id: string, user: TUser) => {
  const userData = await User.findOne({ email: user.email }).select(
    "-password",
  );

  const blog = await Blog.findById(id);

  // Check if the blog exists
  if (!blog) {
    throw new AppError(httpStatusCode.NOT_FOUND, "Blog not found");
  }

  // Checking if this user owns this blog
  if (!blog?.author.equals(userData?._id)) {
    throw new AppError(
      httpStatusCode.UNAUTHORIZE,
      "You are not authorized to delete this blog",
    );
  }

  const result = await Blog.findByIdAndDelete(id).select("-__v");

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
