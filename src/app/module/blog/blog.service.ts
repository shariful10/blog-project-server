import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import AppError from "../../errors/AppError";
import User from "../user/user.model";
import { TBlog } from "./blog.interface";
import Blog from "./blog.model";

const createBlogIntoDB = async (payload: TBlog, token: string) => {
  if (!token) {
    throw new AppError(403, "You are not authorized");
  }

  const decoded = jwt.verify(
    token,
    config.jwtAccessSecret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExists(email);

  // Checking if the user is exist
  if (!user) {
    throw new AppError(404, "User not found!");
  }

  const newPayload = { ...payload, author: user._id };

  const result = await Blog.create(newPayload);
  return result;
};

const getAllBlogsFromDB = async () => {
  const result = await Blog.find()
    .select("-__v")
    .select("-isPublished")
    .select("-createdAt")
    .select("-updatedAt");
  return result;
};

const updateBlogIntoDB = async (
  id: string,
  token: string,
  payload: Partial<TBlog>,
) => {
  if (!token) {
    throw new AppError(403, "You are not authorized");
  }

  const decoded = jwt.verify(
    token,
    config.jwtAccessSecret as string,
  ) as JwtPayload;

  const { email } = decoded;

  const user = await User.isUserExists(email);

  const blog = await Blog.findById(id);

  // Checking if this user owns this blog
  if (!blog?.author.equals(user._id)) {
    throw new AppError(403, "You are not authorized to update this blog");
  }

  const result = await Blog.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return result;
};

export const BlogServices = {
  createBlogIntoDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
};
