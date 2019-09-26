import {Router} from "express";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";
import TeamController from "../controller/TeamController";
import UserController from '../controller/UserController';

const router = Router();

router.get("/teams", [checkJwt, checkRole(["ADMIN"])], TeamController.listAll);

router.get("/teams/:teamID", [checkJwt, checkRole(["ADMIN","MANAGER"])], TeamController.getTeamsByID);

router.post("/teams", TeamController.newTeam);

router.delete("/teams/:teamID", [checkJwt, checkRole(["ADMIN"])], TeamController.deleteTeam);

router.put("/team/:teamID", [checkJwt, checkRole(["ADMIN"])], TeamController.editTeam);

router.post("/teams/:id/add/:userid", [checkJwt, checkRole(["ADMIN","MANAGER"])], TeamController.addUserToTeam);

router.delete("/teams/:id/remove/:userid", [checkJwt, checkRole(["ADMIN","MANAGER"])], TeamController.removeUserToTeam);

router.get("/teams/manager/:managerId", [checkJwt, checkRole(["ADMIN","MANAGER"])], TeamController.getTeamByManager);

router.get("/teams/users/:id", [checkJwt, checkRole(["ADMIN","MANAGER"])], TeamController.getUserForOneTeam);


export default router;
