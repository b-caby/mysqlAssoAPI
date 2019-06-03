import { Router }       from "express";
import usersController  from "./users.controller";

const router: Router = Router();
const controller = new usersController;

router.get("/", controller.getAllUsers);
router.get("/:id", controller.getUserDetails);

export default router;