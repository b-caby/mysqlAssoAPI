import { Router } from "express";
import controller from "./users.controller";
import middleware from "../../shared/middleware";

const router: Router = Router();

router.get("/",               middleware.checkAuthorization,
                              middleware.checkRoles(["ADMIN"]),
                              controller.getAllUsers);
router.get("/account",        middleware.checkAuthorization,
                              controller.getUserAccount);
router.get("/attendance",     middleware.checkAuthorization,
                              controller.getUserAttendance);

export default router;