import { Request, Response } from "express";
import SheetsService         from "./sheets.service";
import Sheet                 from "../../models/sheet";
import logger                from "../../shared/logger";

const service = new SheetsService();
const MISSING_PARAMETERS_ERROR = "The query parameters are not correct";

class SheetsController {

  public getAllSheets = async (req: Request, res: Response) => {
    try {
      const data = await service.getAllSheets();
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getAllSheets - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public getSheetDetails = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(req.params.id, 10);
      const data = await service.getSheetDetails(parsed);
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getSheetDetails - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public createSheet = async (req: Request, res: Response) => {
    const newSheet: Sheet = Object.assign(new Sheet(), req.body);
    // The sheet must have at least the title filled
    if (!newSheet.title) res.status(400).send(MISSING_PARAMETERS_ERROR);
    else {
      try {
        await service.createSheet(newSheet);
        res.status(200).send();
      } catch (err) {
        logger.info(`createSheet - ${err.message}`);
        res.status(500).json(err);
      }
    }
  };

  public updateSheet = async (req: Request, res: Response) => {
    const updatedSheet: Sheet = Object.assign(new Sheet(), req.body);
    // The sheet must have at least the title filled
    if (!updatedSheet.title) res.status(400).send(MISSING_PARAMETERS_ERROR);
    else {
      try {
        const parsed = parseInt(req.params.id, 10);
        await service.updateSheet(parsed, updatedSheet);
        res.status(200).send();
      } catch (err) {
        logger.info(`updateSheet - ${err.message}`);
        res.status(500).json(err);
      }
    }
  };

  public deleteSheet = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(req.params.id, 10);
      await service.deleteSheet(parsed);
      res.status(200).send();
    } catch (err) {
      logger.info(`deleteSheet - ${err.message}`);
      res.status(500).json(err);
    }
  };
}

export default SheetsController;