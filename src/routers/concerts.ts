import { Router }           from "express";
import concertsController   from "../controllers/concerts";

const router: Router = Router();

router.get("/",     concertsController.getAllConcerts);
router.get("/:id",  concertsController.getConcertDetails);

export default router;