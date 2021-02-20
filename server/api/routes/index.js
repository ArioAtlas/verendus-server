import { Router } from "express";
import v1 from "./v1";
import config from "../../config/config";

const router = new Router();

const devRoutes = [
  // routes available only in development mode
];

router.use("/v1", v1);

/* istanbul ignore next */
if (config.env === "development") {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

export default router;
