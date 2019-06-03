import { Router }           from "express";
import benefactorsRouter    from "./benefactors/benefactors.router";
import concertsRouter       from "./concerts/concerts.router";
import sheetsRouter         from "./sheets/sheets.router";
import usersRouter          from "./users/users.router";
import authRouter           from "./auth/auth.router";

const router: Router = Router();

router.use("/sheets",       sheetsRouter);
router.use("/benefactors",  benefactorsRouter);
router.use("/concerts",     concertsRouter);
router.use("/users",        usersRouter);
router.use("/auth",         authRouter);

export default router;