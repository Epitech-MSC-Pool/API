import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import ClockController from "../controller/ClockController";

const router = Router();

router.get("/clocks", [checkJwt, checkRole(["ADMIN"])], ClockController.listAll);

router.get("/clocks/:userID", [checkJwt, checkRole(["ADMIN"])], ClockController.getClocksByUserID);

router.post("/clocks/:userID", [checkJwt, checkRole(["ADMIN"])], ClockController.newClock);

export default router;