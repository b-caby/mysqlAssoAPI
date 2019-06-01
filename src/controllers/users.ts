import { Router, Request, Response }  from "express";
import usersService                   from "../services/usersservice";

const router: Router = Router();

router.get("/", (req: Request, res: Response) => {
  usersService.getAllUsers( (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

router.get("/:id", (req: Request, res: Response) => {
  usersService.getUserDetails(req.params.id, (err: any, data: any) => {
    if (err) res.status(500).json(err);
    else res.status(200).json(data);
  });
});

export default router;