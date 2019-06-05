import { Router }           from "express";
import authController       from "./auth.controller";

const router: Router = Router();
const mycontroller = new authController();

router.post("/", mycontroller.getAuthentification);

export default router;