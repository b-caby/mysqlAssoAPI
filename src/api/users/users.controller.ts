import { Request, Response } from "express";
import UsersService          from "./users.service";
import UserPayload           from "../../models/userpayload";
import atob                  from "atob";

const service = new UsersService();

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
      let token = req.headers["authorization"] || "";
      token = token.slice(7, token.length);
      token = token.split(".")[1];
      const decoded = JSON.parse(atob(token));
      const authInfos: UserPayload = Object.assign(new UserPayload(), decoded);

      const data = await service.getUserAccount(authInfos.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };

  public getUserAttendance = async (req: Request, res: Response) => {
    try {
      let token = req.headers["authorization"] || "";
      token = token.slice(7, token.length);
      token = token.split(".")[1];
      const decoded = JSON.parse(atob(token));
      const authInfos: UserPayload = Object.assign(new UserPayload(), decoded);

      const futureConcerts = await service.getUserAttendance(authInfos.id);
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

export default UsersController;