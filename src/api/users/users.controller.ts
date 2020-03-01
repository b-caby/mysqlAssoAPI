import { Request, Response } from "express";
import service          from "./users.service";

class UsersController {

  public getAllUsers = async (req: Request, res: Response) => {
    try {
      const data = await service.getAllUsers();
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  public getUserAccount = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(res.locals.id, 10);
      const data = await service.getUserAccount(parsed);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  public getUserAttendance = async (req: Request, res: Response) => {
    try {
      const parsed = parseInt(res.locals.id, 10);
      const futureConcerts = await service.getUserAttendance(res.locals.id);
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
      res.status(500).json(err);
    }
  }
}

export default new UsersController;