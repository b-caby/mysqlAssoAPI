import { Request, Response } from "express";
import service               from "./concerts.service";
import Concert               from "../../models/concert";
import logger                from "../../shared/logger";
import Sheet                 from "../../models/sheet";

class ConcertsController {

    public getAllConcerts = async (req: Request, res: Response) => {
        try {
            const data = await service.getAllConcerts();
            res.status(200).json(data);
        } catch (err) {
            logger.info(`getAllConcerts - ${err.message}`);
            res.status(500).json(err);
        }
    };

    public getConcertDetails = async (req: Request, res: Response) => {
        try {
            const parsed = parseInt(req.params.id, 10);
            const data = await service.getConcertDetails(parsed);
            res.status(200).json(data);
        } catch (err) {
            logger.info(`getConcertDetails - ${err.message}`);
            res.status(500).json(err);
        }
    };

    public createConcert = async (req: Request, res: Response) => {
        const newConcert: Concert = Object.assign(new Concert(), req.body);
        // The concert must have at least the name filled
        if (!newConcert.name) res.status(400).json("The query parameters are not correct");
        else {
            try {
                const data = await service.createConcert(newConcert);
                if (newConcert.concertSheets) await this.manageConcertSheets(newConcert.concertSheets, data.insertId);
                res.status(200).send();
            } catch (err) {
                logger.info(`createConcert - ${err.message}`);
                res.status(500).json(err);
            }
        }
    };

    public updateConcert = async (req: Request, res: Response) => {
        const updatedConcert: Concert = Object.assign(new Concert(), req.body);
        // The concert must have at least the name filled
        if (!updatedConcert.name) res.status(400).json("The query parameters are not correct");
        else {
            try {
                const parsed = parseInt(req.params.id, 10);
                await service.updateConcert(parsed, updatedConcert);
                if (updatedConcert.concertSheets) await this.manageConcertSheets(updatedConcert.concertSheets, parsed);
                res.status(200).send();
            } catch (err) {
                logger.info(`updateConcert - ${err.message}`);
                res.status(500).json(err);
            }
        }
    };

    public deleteConcert = async (req: Request, res: Response) => {
        try {
            const parsed = parseInt(req.params.id, 10);
            await service.deleteConcert(parsed);
            res.status(200).send();
        } catch (err) {
            logger.info(`deleteConcert - ${err.message}`);
            res.status(500).json(err);
        }
    };

    private manageConcertSheets = async (sheets: Sheet[], concertId: number) => {
        const updatedSheets = sheets.map(sheet => sheet.id);
        const currentSheets = await service.getConcertSheets(concertId) as number[];
        const addedSheets = updatedSheets.filter(sheet => !currentSheets.includes(sheet));
        const removedSheets = currentSheets.filter(sheet => !updatedSheets.includes(sheet));

        if (addedSheets.length !== 0) {
            await service.addSheetsToConcert(addedSheets, concertId);
        }

        if (removedSheets && removedSheets.length !== 0) {
            await service.removeSheetsFromConcert(removedSheets, concertId);
        }
    };
}

export default new ConcertsController;