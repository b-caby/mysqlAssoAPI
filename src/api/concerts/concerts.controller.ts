import { Request, Response }  from "express";
import concertsService        from "./concerts.service";
import concert                from "../../models/concert";

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

    public createConcert = (req: Request, res: Response) => {
        if (!req.body) res.status(400).json("The query parameters are not correct");
        else {
            const newConcert: concert = Object.assign(new concert(), req.body);
            service.createConcert(newConcert, (err: any, data: any) => {
                if (err) res.status(500).json(err);
                else res.status(200).send();
            });
        }
    };

    public updateConcert = (req: Request, res: Response) => {
        if (!req.body) res.status(400).json("The query parameters are not correct");
        else {
          const updatedConcert: concert = Object.assign(new concert(), req.body);
          service.updateConcert(req.params.id, updatedConcert, (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).send();
          });
        }
    };

    public deleteConcert = (req: Request, res: Response) => {
        service.deleteConcert(req.params.id, (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else res.status(200).send();
          });
        };
}

export default ConcertsController;