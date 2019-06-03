import { Request, Response }  from "express";
import benefactorsService     from "./benefactors.service";

const service = new benefactorsService;

class BenefactorsController {

  public getAllBenefactors = (req: Request, res: Response) => {
    service.getAllBenefactors( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public getBenefactorDetails = (req: Request, res: Response) => {
    service.getBenefactorDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default BenefactorsController;