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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../config"));
const AppError_1 = __importDefault(require("../../errors/AppError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const blog_model_1 = __importDefault(require("./blog.model"));
const createBlogIntoDB = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    if (!token) {
        throw new AppError_1.default(403, "You are not authorized");
    }
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwtAccessSecret);
    const { email } = decoded;
    const user = yield user_model_1.default.isUserExists(email);
    // Checking if the user is exist
    if (!user) {
        throw new AppError_1.default(404, "User not found!");
    }
    const newPayload = Object.assign(Object.assign({}, payload), { author: user._id });
    const result = yield blog_model_1.default.create(newPayload);
    return result;
});
exports.BlogServices = {
    createBlogIntoDB,
};
