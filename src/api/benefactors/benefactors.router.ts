import { Router }               from "express";
import benefactorsController    from "./benefactors.controller";
import middleware               from "../../shared/jwtmiddleware";

const router: Router = Router();
const controller = new benefactorsController;

router.get("/",     middleware.checkAuthorization, controller.getAllBenefactors);
router.get("/:id",  middleware.checkAuthorization, controller.getBenefactorDetails);

export default router;