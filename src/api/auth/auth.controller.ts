import { Request, Response }  from "express";
import authService            from "./auth.service";
import { secret }             from "../../config";
import * as jwt               from "jsonwebtoken";
import userpayload                  from "../../models/userpayload";

const service = new authService;

class AuthController {

  public getAuthentification = (req: Request, res: Response) => {
    // Body should be {"login": "login", "password": "password"}
    if (!(req.body.login && req.body.password && Object.keys(req.body).length === 2)) res.status(400).json("The query parameters are not correct");
    else {
      service.getAuthentification(req.body.login, req.body.password, (err: any, data: any) => {
        if (err) res.status(500).json(err);
        else {
          const user = new userpayload(data[0].id, data[0].login, data[0].role);
          const token = this.createToken(user);
          data[0].token = token;
          res.status(200).json(data);
        }
      });
    }
  };

  private createToken = (user: userpayload) => {
    const payload = { id: user.id, login: user.login, role: user.role };
    const token = jwt.sign(payload, secret);
    return token;
  };

}

export default AuthController;