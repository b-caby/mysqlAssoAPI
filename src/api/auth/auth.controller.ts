import { Request, Response } from "express";
import AuthService           from "./auth.service";
import { secret }            from "../../config";
import * as jwt              from "jsonwebtoken";
import Userpayload           from "../../models/userpayload";

const service = new AuthService();

class AuthController {

  public getAuthentification = async (req: Request, res: Response) => {
    // Body should be {"login": "login", "password": "password"}
    if (!(req.body.login && req.body.password && Object.keys(req.body).length === 2)) res.status(400).json("The query parameters are not correct");
    else {
      try {
        const data = await service.getAuthentification(req.body.login, req.body.password);
        const user = new Userpayload(data[0].id, data[0].login, data[0].role);
        const token = this.createToken(user);
        data[0].token = token;
        res.status(200).json(data);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

  private createToken = (user: Userpayload) => {
    const payload = { id: user.id, login: user.login, role: user.role };
    const token = jwt.sign(payload, secret);
    return token;
  };

}

export default AuthController;