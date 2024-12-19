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
exports.AdminServices = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const blog_model_1 = __importDefault(require("../blog/blog.model"));
const user_model_1 = __importDefault(require("../user/user.model"));
const blockUserIntoDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.default.findByIdAndUpdate(id, { isBlocked: true });
    if (!result) {
        throw new AppError_1.default(404, "User not found");
    }
    return result;
});
const deleteBlogFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield blog_model_1.default.findByIdAndDelete(id);
    if (!result) {
        throw new AppError_1.default(404, "Blog not found");
    }
    return result;
});
exports.AdminServices = {
    blockUserIntoDB,
    deleteBlogFromDB,
};
