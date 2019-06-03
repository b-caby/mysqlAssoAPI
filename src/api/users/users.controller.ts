import { Request, Response }  from "express";
import usersService           from "./users.service";

const service = new usersService;

class UsersController {

  public getAllUsers = (req: Request, res: Response) => {
    service.getAllUsers( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public getUserDetails = (req: Request, res: Response) => {
    service.getUserDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default UsersController;