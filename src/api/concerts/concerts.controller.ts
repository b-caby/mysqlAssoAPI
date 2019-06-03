import { Request, Response }  from "express";
import concertsService        from "./concerts.service";

const service = new concertsService;

class ConcertsController {

    public getAllConcerts = (req: Request, res: Response) => {
        service.getAllConcerts( (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(data);
        });
    };

    public getConcertDetails = (req: Request, res: Response) => {
        service.getConcertDetails(req.params.id, (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).json(data);
        });
    };
}

export default ConcertsController;