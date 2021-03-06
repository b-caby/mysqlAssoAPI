import { Request, Response } from "express";
import service               from "./benefactors.service";
import logger                from "../../shared/logger";

class BenefactorsController {

  public getAllBenefactors = async (req: Request, res: Response) => {
    try {
      const data = await service.getAllBenefactors();
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getAllBenefactors - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public getBenefactorDetails = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(req.params.id, 10);
      const data = await service.getBenefactorDetails(parsed);
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getBenefactorDetails - ${err.message}`);
      res.status(500).json(err);
    }
  };
}

export default new BenefactorsController;