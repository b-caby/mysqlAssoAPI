import { Router }       from "express";
import SheetsController from "./sheets.controller";
import middleware       from "../../shared/jwtmiddleware";
import roles            from "../../shared/roles.enum";

const router: Router = Router();
const controller = new SheetsController();

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