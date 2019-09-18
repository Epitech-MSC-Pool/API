import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import TeamController from "../controller/TeamController";
import UserController from '../controller/UserController';

const router = Router();

router.get("/teams", [checkJwt, checkRole(["ADMIN"])], TeamController.listAll);

router.get("/teams/:teamID", [checkJwt, checkRole(["ADMIN"])], TeamController.getTeamsByID);

router.post("/teams", TeamController.newTeam);

router.delete("/teams/:teamID", [checkJwt, checkRole(["ADMIN"])], TeamController.deleteTeam);

router.put("/team/:teamID", [checkJwt, checkRole(["ADMIN"])], TeamController.editTeam);

router.post("/teams/:id/add/:userid", [checkJwt, checkRole(["ADMIN"])], TeamController.addUserToTeam);

router.delete("/teams/:id/remove/:userid", [checkJwt, checkRole(["ADMIN"])], TeamController.removeUserToTeam);


export default router;