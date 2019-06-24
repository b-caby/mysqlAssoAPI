import { Request, Response } from "express";
import SheetsService         from "./sheets.service";
import Sheet                 from "../../models/sheet";

const service = new SheetsService();

class SheetsController {

  public getAllSheets = async (req: Request, res: Response) => {
    try {
      const data = await service.getAllSheets();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  public getSheetDetails = async (req: Request, res: Response) => {
    try {
      const data = await service.getSheetDetails(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  public createSheet = async (req: Request, res: Response) => {
    const newSheet: Sheet = Object.assign(new Sheet(), req.body);
    // The sheet must have at least the title filled
    if (!newSheet.title) res.status(400).json("The query parameters are not correct");
    else {
      try {
        const data = await service.createSheet(newSheet);
        res.status(200).send();
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

  public updateSheet = async (req: Request, res: Response) => {
    const updatedSheet: Sheet = Object.assign(new Sheet(), req.body);
    // The sheet must have at least the title filled
    if (!updatedSheet.title) res.status(400).json("The query parameters are not correct");
    else {
      try {
        const data = await service.updateSheet(req.params.id, updatedSheet);
        res.status(200).send();
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

  public deleteSheet = async (req: Request, res: Response) => {
    try {
      const data = await service.deleteSheet(req.params.id);
      res.status(200).send();
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default SheetsController;