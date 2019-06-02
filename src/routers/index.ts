import { Router }           from "express";
import benefactorsRouter    from "./benefactors";
import concertsRouter       from "./concerts";
import sheetsRouter         from "./sheets";
import usersRouter          from "./users";

const router: Router = Router();

router.use("/sheets",       sheetsRouter);
router.use("/benefactors",  benefactorsRouter);
router.use("/concerts",     concertsRouter);
router.use("/users",        usersRouter);

export default router;