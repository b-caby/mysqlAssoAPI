import { Router, Request, Response }  from "express";
import concertsService                from "../services/concertsservice";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
    concertsService.getAllConcerts( (err: any, data: any) => {
        if (err) res.status(500).json(err);
        else res.status(200).json(data);
    });
});

router.get("/:id", (req: Request, res: Response) => {
    concertsService.getConcertDetails(req.params.id, (err: any, data: any) => {
        if (err) res.status(500).json(err);
        else res.status(200).json(data);
    });
});

export default router;