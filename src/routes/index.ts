import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import clock from "./clocks";
import workingtimes from "./workingTimes";

const routes = Router();

routes.use("/", auth);
routes.use("/", user);
routes.use("/", clock);
routes.use("/", workingtimes);

export default routes;