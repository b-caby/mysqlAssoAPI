import { Router }               from "express";
import benefactorsController    from "./benefactors.controller";

const router: Router = Router();
const controller = new benefactorsController;

router.get("/",     controller.getAllBenefactors);
router.get("/:id",  controller.getBenefactorDetails);

export default router;