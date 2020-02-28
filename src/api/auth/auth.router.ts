import { Router } from "express";
import controller from "./auth.controller";

const router: Router = Router();

router.post("/", controller.getAuthentification);

export default router;