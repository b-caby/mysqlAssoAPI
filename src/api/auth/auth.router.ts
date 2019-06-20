import { Router }     from "express";
import AuthController from "./auth.controller";

const router: Router = Router();
const mycontroller = new AuthController();

router.post("/", mycontroller.getAuthentification);

export default router;