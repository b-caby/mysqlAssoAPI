import { Router }       from "express";
import sheetsController from "../controllers/sheets";

const router: Router = Router();

router.get("/",     sheetsController.getAllSheets);
router.get("/:id",  sheetsController.getSheetDetails);

export default router;