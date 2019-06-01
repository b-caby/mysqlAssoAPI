import { Router, Request, Response }  from "express";
import sheetsService                  from "../services/sheetsservice";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  sheetsService.getAllSheets( (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

router.get("/:id", (req: Request, res: Response) => {
  sheetsService.getSheetDetails(req.params.id, (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

export default router;