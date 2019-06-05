import { Request, Response } from "express";
import { secret }            from "../config";
import * as jwt              from "jsonwebtoken";

class JWTMiddleware {

    public checkAuthorization = (req: Request, res: Response, next: any) => {
        let token = req.headers["authorization"] || "";
        if (token.startsWith("Bearer")) token = token.slice(7, token.length);
        if (!token) res.status(401).send("Token is not supplied");
        else {
            jwt.verify(token, secret, (err) => {
                if (err) res.status(403).send("Token is invalid");
                else next();
            });
        }
    };
}

export default new JWTMiddleware;