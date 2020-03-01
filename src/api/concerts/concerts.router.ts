import { Router } from "express";
import controller from "./concerts.controller";
import middleware from "../../shared/middleware";
import roles      from "../../shared/roles.enum";

const router: Router = Router();

router.get("/",     middleware.checkAuthorization, controller.getAllConcerts);
router.get("/:id",  middleware.checkAuthorization, controller.getConcertDetails);

router.post("/",        middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                        controller.createConcert);
router.post("/:id",     middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN, roles.OFFICER]),
                        controller.updateConcert);
router.delete("/:id",   middleware.checkAuthorization,
                        middleware.checkRoles([roles.ADMIN]),
                        controller.deleteConcert);

export default router;