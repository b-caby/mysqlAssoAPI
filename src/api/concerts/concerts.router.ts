import { Router }           from "express";
import concertsController   from "./concerts.controller";
import middleware           from "../../shared/jwtmiddleware";

const router: Router = Router();
const controller = new concertsController;

router.get("/",     middleware.checkAuthorization, controller.getAllConcerts);
router.get("/:id",  middleware.checkAuthorization, controller.getConcertDetails);

export default router;