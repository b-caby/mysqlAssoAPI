import { Request, Response }  from "express";
import concertsService        from "./concerts.service";

class ConcertsController {

    public static getAllConcerts = (req: Request, res: Response) => {
        concertsService.getAllConcerts( (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(data);
        });
    };

    public static getConcertDetails = (req: Request, res: Response) => {
        concertsService.getConcertDetails(req.params.id, (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(data);
        });
    };
}

export default ConcertsController;