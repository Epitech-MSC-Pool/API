import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import WorkingTimesController from '../controller/WorkingTimesController';

const router = Router();

router.get("/workingtimes/:userID/:start&:end", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.listAll);

router.get("/workingtimes/:userID/:workingtimeID", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.getOneById);

router.post("/workingtimes/:userID", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.newWorkingTime);

router.put("/workingtimes/:id", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.editWorkingTime);

router.put("/workingtimes/:id/time", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.editWorkingTime);

router.delete("/workingtimes/:id", [checkJwt, checkRole(["ADMIN"])], WorkingTimesController.deleteWorkingTime);

export default router;