import { Router }       from "express";
import sheetsController from "./sheets.controller";

const router: Router = Router();

router.get("/",     sheetsController.getAllSheets);
router.get("/:id",  sheetsController.getSheetDetails);

export default router;