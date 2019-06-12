import { Router }       from "express";
import sheetsController from "./sheets.controller";
import middleware       from "../../shared/jwtmiddleware";
import roles            from "../../shared/roles.enum";

const router: Router = Router();
const controller = new sheetsController;

router.get("/",     middleware.checkAuthorization, controller.getAllSheets);
router.get("/:id",  middleware.checkAuthorization, controller.getSheetDetails);

router.post("/",    middleware.checkAuthorization,
                    middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                    controller.createSheet);

export default router;