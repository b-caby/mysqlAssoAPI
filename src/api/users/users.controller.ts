import { Request, Response } from "express";
import UsersService          from "./users.service";
import UserPayload           from "../../models/userpayload";

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

  public getUserDetails = async (req: Request, res: Response) => {
    try {
      let token = req.headers["authorization"] || "";
      token = token.slice(7, token.length);
      const decoded = JSON.parse(window.atob(token.split(".")[1]));
      const authInfos: UserPayload = Object.assign(new UserPayload(), decoded);

      const data = await service.getUserDetails(authInfos.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default UsersController;