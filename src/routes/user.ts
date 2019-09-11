import {Router} from "express";
import UserController from "../controller/UserController";
import {checkJwt} from "../middlewares/checkJwt";
import {checkRole} from "../middlewares/checkRole";

const router = Router();

//Get all users
router.get("/users", [checkJwt, checkRole(["ADMIN"])], UserController.listAll);

// Get one user
router.get(
    "/users/:userID",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneById
);

router.get(
    "/users/:username/:email",
    [checkJwt, checkRole(["ADMIN"])],
    UserController.getOneByEmail
);

//Create a new user
router.post("/users", [checkJwt, checkRole(["ADMIN"])], UserController.newUser);

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