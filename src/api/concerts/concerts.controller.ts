import { Request, Response } from "express";
import ConcertsService       from "./concerts.service";
import concert               from "../../models/concert";

const service = new ConcertsService();

class ConcertsController {

    public getAllConcerts = async (req: Request, res: Response) => {
        try {
            const data = await service.getAllConcerts();
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    public getConcertDetails = async (req: Request, res: Response) => {
        try {
            const data = await service.getConcertDetails(req.params.id);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    };

    public createConcert = async (req: Request, res: Response) => {
        const newConcert: concert = Object.assign(new concert(), req.body);
        // The concert must have at least the name filled
        if (!newConcert.name) res.status(400).json("The query parameters are not correct");
        else {
            try {
                const data = await service.createConcert(newConcert);
                res.status(200).json(data);
            } catch (err) {
                res.status(500).json(err);
            }
        }
    };

    public updateConcert = async (req: Request, res: Response) => {
        const updatedConcert: concert = Object.assign(new concert(), req.body);
        // The concert must have at least the name filled
        if (!updatedConcert.name) res.status(400).json("The query parameters are not correct");
        else {
            try {
                const data = await service.updateConcert(req.params.id, updatedConcert);
                res.status(200).json(data);
            } catch (err) {
                    res.status(500).json(err);
            }
        }
    };

    public deleteConcert = async (req: Request, res: Response) => {
        try {
            const data = await service.deleteConcert(req.params.id);
            res.status(200).json(data);
        } catch (err) {
            res.status(500).json(err);
        }
    };
}

export default ConcertsController;