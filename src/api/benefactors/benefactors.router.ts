import { Router }               from "express";
import benefactorsController    from "./benefactors.controller";

const router: Router = Router();

router.get("/",     benefactorsController.getAllBenefactors);
router.get("/:id",  benefactorsController.getBenefactorDetails);

export default router;