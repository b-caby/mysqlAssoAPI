import { Router }            from "express";
import BenefactorsController from "./benefactors.controller";
import middleware            from "../../shared/jwtmiddleware";
import roles                 from "../../shared/roles.enum";

const router: Router = Router();
const controller = new BenefactorsController();

router.get("/", middleware.checkAuthorization,
                middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                controller.getAllBenefactors);

router.get("/:id",  middleware.checkAuthorization,
                    middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                    controller.getBenefactorDetails);

export default router;