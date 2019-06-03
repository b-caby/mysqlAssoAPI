import { Request, Response }  from "express";
import usersService           from "./users.service";

class UsersController {

  public static getAllUsers = (req: Request, res: Response) => {
    usersService.getAllUsers( (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };

  public static getUserDetails = (req: Request, res: Response) => {
    usersService.getUserDetails(req.params.id, (err: any, data: any) => {
      if (err) res.status(500).json(err);
      else res.status(200).json(data);
    });
  };
}

export default UsersController;