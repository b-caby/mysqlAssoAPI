import { Request, Response }  from "express";
import sheetsService          from "./sheets.service";

class SheetsController {

  public static getAllSheets = (req: Request, res: Response) => {
    sheetsService.getAllSheets( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public static getSheetDetails = (req: Request, res: Response) => {
    sheetsService.getSheetDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default SheetsController;