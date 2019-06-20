import { Request, Response } from "express";
import UsersService          from "./users.service";

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
      const data = await service.getUserDetails(req.params.id);
      res.status(200).json(data);
    } catch (err) {
      res.status(500).json(err);
    }
  };
}

export default UsersController;