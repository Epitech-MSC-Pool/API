import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import ClockController from "../controller/ClockController";

const router = Router();

router.get("/clocks", [checkJwt, checkRole(["ADMIN"])], ClockController.listAll);

router.get("/clocks/:userID", [checkJwt], ClockController.getClocksByUserID);

router.post("/clocks/:userID", [checkJwt, checkRole(["ADMIN"])], ClockController.newClock);

router.put("/clocks/:userID", [checkJwt], ClockController.editClock);

router.post("/clocks/out/:userID", [checkJwt], ClockController.clockOut);

export default router;
