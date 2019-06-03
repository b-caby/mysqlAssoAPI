import { Request, Response }  from "express";
import benefactorsService     from "./benefactors.service";

class BenefactorsController {

  public static getAllBenefactors = (req: Request, res: Response) => {
    benefactorsService.getAllBenefactors( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public static getBenefactorDetails = (req: Request, res: Response) => {
    benefactorsService.getBenefactorDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default BenefactorsController;