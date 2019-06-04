import { Request, Response }  from "express";
import authService            from "./auth.service";
import { secret }             from "../../config";
import * as jwt               from "jsonwebtoken";

const service = new authService;

class AuthController {

  public getAuthentification = (req: Request, res: Response) => {
    // Body should be {"login": "login", "password": "password"}
    if (!(req.body.login && req.body.password && Object.keys(req.body).length === 2)) res.status(400).json("The query parameters are not correct");
    else {
      service.getAuthentification(req.body.login, req.body.password, (err: any, data: any) => {
        if (err) res.status(500).json(err);
        else {
          this.getJWTToken(data);
          res.status(200).json(data);
        }
      });
    }
  };

  private getJWTToken = (data: any) => {
    if (data.length === 1) {
      const payload = { login: data[0].login, role: data[0].role };
      const token = jwt.sign(payload, secret, { expiresIn: "1h" });
      data[0].token = token;
    }
  };
}

export default AuthController;