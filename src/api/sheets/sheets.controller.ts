import { Request, Response }  from "express";
import sheetsService          from "./sheets.service";
import sheet                  from "../../models/sheet";

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

  public createSheet = (req: Request, res: Response) => {
    if (!req.body) res.status(400).json("The query parameters are not correct");
    else {
      const newSheet: sheet = Object.assign(new sheet(), req.body);
      service.createSheet(newSheet, (err: any, data: any) => {
        if (err) res.status(500).json(err);
        else res.status(200).send();
      });
    }
  };
}

export default SheetsController;