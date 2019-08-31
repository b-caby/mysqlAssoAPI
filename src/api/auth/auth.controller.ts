import { Request, Response } from "express";
import AuthService           from "./auth.service";
import { secret }            from "../../config";
import * as jwt              from "jsonwebtoken";
import UserPayload           from "../../models/userpayload";

const service = new AuthService();

class AuthController {

  public getAuthentification = async (req: Request, res: Response) => {
    // Body should be {"login": "login", "password": "password"}
    if (!(req.body.login && req.body.password && Object.keys(req.body).length === 2)) res.status(400).json("The query parameters are not correct");
    else {
      try {
        const data = await service.getAuthentification(req.body.login, req.body.password);
        const token = this.createToken(Object.assign(new UserPayload(), data));
        res.status(200).json(token);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  };

  private createToken = (user: UserPayload) => {
    let token = "";
    if (user.id) {
      const payload = { id: user.id, firstname: user.firstname, name: user.name, role: user.role };
      token = jwt.sign(payload, secret);
    }

    return token;
  };
}

export default AuthController;