import { Router } from "express";
import controller from "./sheets.controller";
import middleware from "../../shared/middleware";
import roles      from "../../shared/roles.enum";

const router: Router = Router();

router.get("/",         middleware.checkAuthorization, controller.getAllSheets);
router.get("/:id",      middleware.checkAuthorization, controller.getSheetDetails);

router.post("/",        middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                        controller.createSheet);
router.post("/:id",     middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                        controller.updateSheet);

router.delete("/:id",   middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN]),
                        controller.deleteSheet);

export default router;