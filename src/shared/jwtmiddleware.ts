import { Request, Response } from "express";
import { secret }            from "../config";
import * as jwt              from "jsonwebtoken";
import { intersection }      from "lodash";

class JWTMiddleware {

    public checkAuthorization = (req: Request, res: Response, next: any) => {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer")) token = token.slice(7, token.length);
        if (!token) res.status(401).send("Token is not supplied");
        else {
            jwt.verify(token, secret, (err, decoded: any) => {
                if (err) res.status(403).send("Token is invalid");
                else {
                    res.locals.role = decoded.role;
                    next();
                }
            });
        }
    };

    public checkRoles = (roles: string[]) => {
        return async (req: Request, res: Response, next: any) => {
            const role = [res.locals.role];
            if (intersection(role, roles).length === 0) res.status(403).json("Unsufficient role");
            else next();
          };
    };
}

export default new JWTMiddleware;