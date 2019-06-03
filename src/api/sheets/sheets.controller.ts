import { Request, Response }  from "express";
import sheetsService          from "./sheets.service";

const service = new sheetsService;

class SheetsController {

  public getAllSheets = (req: Request, res: Response) => {
    service.getAllSheets( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public getSheetDetails = (req: Request, res: Response) => {
    service.getSheetDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default SheetsController;