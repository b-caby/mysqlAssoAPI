import { Router }           from "express";
import concertsController   from "./concerts.controller";

const router: Router = Router();
const controller = new concertsController;

router.get("/",     controller.getAllConcerts);
router.get("/:id",  controller.getConcertDetails);

export default router;