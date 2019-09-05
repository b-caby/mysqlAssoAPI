import { Router }      from "express";
import UsersController from "./users.controller";
import middleware      from "../../shared/jwtmiddleware";

const router: Router = Router();
const controller = new UsersController();

router.get("/",         middleware.checkAuthorization, controller.getAllUsers);
router.get("/account",  middleware.checkAuthorization, controller.getUserDetails);

export default router;