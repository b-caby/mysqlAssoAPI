import { Request, Response } from "express";
import service               from "./users.service";
import logger                from "../../shared/logger";
import User                  from "../../models/user";

const MISSING_PARAMETERS_ERROR = "The query parameters are not correct";

class UsersController {

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await service.getAllUsers();
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getAllUsers - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public getUserDetails = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(req.params.id, 10);
      const data = await service.getUserDetails(parsed);
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getUserDetails - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public getUserAccount = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(res.locals.id, 10);
      const data = await service.getUserAccount(parsed);
      res.status(200).json(data);
    } catch (err) {
      logger.info(`getUserAccount - ${err.message}`);
      res.status(500).json(err);
    }
  };

  public getUserAttendance = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(res.locals.id, 10);
      const futureConcerts = await service.getUserAttendance(parsed);
      futureConcerts.forEach(concert => {
        if (!!concert.present)        concert.status = 1;
        else if (!!concert.absent)    concert.status = 2;
        else if (!!concert.maybe)     concert.status = 3;
        else                          concert.status = 0;

        delete concert.absent;
        delete concert.present;
        delete concert.maybe;
        delete concert.undefined;
      });
      res.status(200).json(futureConcerts);
    } catch (err) {
      logger.info(`getUserAttendance - ${err.message}`);
      res.status(500).json(err);
    }
  }
}

export default new UsersController;