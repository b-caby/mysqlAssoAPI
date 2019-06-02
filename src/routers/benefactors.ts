import { Router }               from "express";
import benefactorsController    from "../controllers/benefactors";

const router: Router = Router();

router.get("/",     benefactorsController.getAllBenefactors);
router.get("/:id",  benefactorsController.getBenefactorDetails);

export default router;