import { Router } from "express";
import { AuthRoutes } from "../module/Auth/auth.route";
import { BlogRoutes } from "../module/blog/blog.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/blogs",
    route: BlogRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
