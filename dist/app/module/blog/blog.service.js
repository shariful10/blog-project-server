"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const httpStatusCode_1 = require("../../utils/httpStatusCode");
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_const_1 = require("./blog.const");
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.default.findOne({ email: user.email }).select("-password");
    if ((userData === null || userData === void 0 ? void 0 : userData.role) !== "user") {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.FORBIDDEN, "You are not authorized to create a blog");
    }
    const newPayload = Object.assign(Object.assign({}, payload), { author: userData === null || userData === void 0 ? void 0 : userData._id });
    const result = (yield blog_model_1.default.create(newPayload)).populate("author");
    return result;
});
const getAllBlogsFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const blogQuery = new QueryBuilder_1.default(blog_model_1.default.find().select("-__v").populate("author"), query)
        .search(blog_const_1.searchableFields)
        .filter()
        .sort();
    const result = yield blogQuery.modelQuery;
    return result;
});
const updateBlogIntoDB = (id, user, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.default.findOne({ email: user.email }).select("-password");
    const blog = yield blog_model_1.default.findById(id);
    // Check if the blog exists
    if (!blog) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "Blog not found");
    }
    // Checking if this user owns this blog
    if (!(blog === null || blog === void 0 ? void 0 : blog.author.equals(userData === null || userData === void 0 ? void 0 : userData._id))) {
        throw new AppError_1.default(403, "You are not authorized to update this blog");
    }
    const result = yield blog_model_1.default.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    })
        .select("-__v")
        .populate("author");
    return result;
});
const deleteBlogFromDB = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const userData = yield user_model_1.default.findOne({ email: user.email }).select("-password");
    const blog = yield blog_model_1.default.findById(id);
    // Check if the blog exists
    if (!blog) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.NOT_FOUND, "Blog not found");
    }
    // Checking if this user owns this blog
    if (!(blog === null || blog === void 0 ? void 0 : blog.author.equals(userData === null || userData === void 0 ? void 0 : userData._id))) {
        throw new AppError_1.default(httpStatusCode_1.httpStatusCode.UNAUTHORIZE, "You are not authorized to delete this blog");
    }
    const result = yield blog_model_1.default.findByIdAndDelete(id).select("-__v");
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
    getAllBlogsFromDB,
    updateBlogIntoDB,
    deleteBlogFromDB,
};
