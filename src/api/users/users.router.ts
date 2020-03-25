import { Router } from "express";
import controller from "./users.controller";
import middleware from "../../shared/middleware";
import roles      from "../../shared/roles.enum";

const router: Router = Router();

router.get("/",           middleware.checkAuthorization,
                          controller.getAllUsers);
router.get("/:id",        middleware.checkAuthorization,
                          controller.getUserDetails);
router.get("/account",    middleware.checkAuthorization,
                          controller.getUserAccount);

router.get("/attendance", middleware.checkAuthorization,
                          controller.getUserAttendance);

export default router;