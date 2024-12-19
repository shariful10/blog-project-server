"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlogRoutes = void 0;
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../middleware/validateRequest"));
const user_const_1 = require("../user/user.const");
const blog_controller_1 = require("./blog.controller");
const blog_validation_1 = require("./blog.validation");
const router = express_1.default.Router();
router.post("/", (0, auth_1.default)(user_const_1.USER_ROLE.admin, user_const_1.USER_ROLE.user), (0, validateRequest_1.default)(blog_validation_1.BlogValidations.createBlogValidationSchema), blog_controller_1.BlogControllers.createBlog);
exports.BlogRoutes = router;
