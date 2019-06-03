import { Router }       from "express";
import sheetsController from "./sheets.controller";

const router: Router = Router();
const controller = new sheetsController;

router.get("/",     controller.getAllSheets);
router.get("/:id",  controller.getSheetDetails);

export default router;