import { Router }       from "express";
import usersController  from "./users.controller";
import middleware       from "../../shared/jwtmiddleware";

const router: Router = Router();
const controller = new usersController;

router.get("/",     middleware.checkAuthorization, controller.getAllUsers);
router.get("/:id",  middleware.checkAuthorization, controller.getUserDetails);

export default router;