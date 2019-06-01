import { Router, Request, Response }  from "express";
import benefactorsService             from "../services/benefactorsservice";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  benefactorsService.getAllBenefactors( (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

router.get("/:id", (req: Request, res: Response) => {
  benefactorsService.getBenefactorDetails(req.params.id, (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

export default router;