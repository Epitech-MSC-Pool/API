import {Router} from "express";
import UserController from "../controller/UserController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/users", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

router.get(
    "/users/:username&:email",
    [checkJwt, checkRole(["ADMIN","USER"])],
    UserController.getOneByEmail
);
// Get one user
router.get(
    "/users/:userID",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);



//Create a new user
router.post("/users", UserController.newUser);

//Edit one user
router.put(
    "/users/:userID",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.editUser
);

//Delete one user
router.delete(
    "/users/:userID",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.deleteUser
);

export default router;