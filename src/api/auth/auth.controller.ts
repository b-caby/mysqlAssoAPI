import { Request, Response }  from "express";
import authService            from "./auth.service";
import { secret }             from "../../config";
import * as jwt               from "jsonwebtoken";

const service = new authService;

class AuthController {

  public getAuthentification = (req: Request, res: Response) => {
    // Body should be {"login": "login", "password": "password"}
    if (req.body.login && req.body.password && Object.keys(req.body).length === 2) {
        service.getAuthentification(req.body.login, req.body.password, (err: any, data: any) => {
            if (err) res.status(500).json(err);
            else {
              // If the authentification is OK, create a JWT
              if (data.length === 1) {
                this.getJWTToken(data);
              }
              res.status(200).json(data);
            }
        });
    }
    // Warn the user if the body of the request is not conform
    else {
        res.status(400).json("The query parameters are not correct");
    }
  };

  private getJWTToken = async (data: any) => {
    const payload = {
      login: data[0].login,
      role: data[0].role
    };

    const token = jwt.sign(payload, secret, { expiresIn: "1h" });
    data[0].token = token;
  };
}

export default AuthController;