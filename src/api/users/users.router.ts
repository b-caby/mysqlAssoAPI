import { Router }       from "express";
import usersController  from "./users.controller";

const router: Router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserDetails);

export default router;