import { Router, Request, Response } from "express";
import auth from "./auth";
import user from "./user";
import clock from "./clocks";

const routes = Router();

routes.use("/", auth);
routes.use("/", user);
routes.use("/", clock);

export default routes;