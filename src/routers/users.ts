import { Router }       from "express";
import usersController  from "../controllers/users";

const router: Router = Router();

router.get("/", usersController.getAllUsers);
router.get("/:id", usersController.getUserDetails);

export default router;