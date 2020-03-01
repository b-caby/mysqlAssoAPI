import { Router } from "express";
import controller from "./benefactors.controller";
import middleware from "../../shared/middleware";
import roles      from "../../shared/roles.enum";

const router: Router = Router();

router.get("/", middleware.checkAuthorization,
                middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                controller.getAllBenefactors);

router.get("/:id",  middleware.checkAuthorization,
                    middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                    controller.getBenefactorDetails);

export default router;