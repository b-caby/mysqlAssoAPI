import { Router }       from "express";
import sheetsController from "./sheets.controller";
import middleware       from "../../shared/jwtmiddleware";

const router: Router = Router();
const controller = new sheetsController;

router.get("/",     middleware.checkAuthorization, controller.getAllSheets);
router.get("/:id",  middleware.checkAuthorization, controller.getSheetDetails);

export default router;