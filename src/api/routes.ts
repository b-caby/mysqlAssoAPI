import { Router }           from "express";
import benefactorsRouter    from "./benefactors/benefactors.router";
import concertsRouter       from "./concerts/concerts.router";
import sheetsRouter         from "./sheets/sheets.router";
import usersRouter          from "./users/users.router";

const router: Router = Router();

router.use("/sheets",       sheetsRouter);
router.use("/benefactors",  benefactorsRouter);
router.use("/concerts",     concertsRouter);
router.use("/users",        usersRouter);

export default router;