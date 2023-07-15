import _ from "lodash";
import { Response, Request, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";

const deserializeUser = (req: Request, res: Response, next: NextFunction) => {
    const accessToken = _.get(req, "headers.authorization", "").replace(/^Bearer\s/, "");
    if (!accessToken) return next();

    const { decoded, expired } = verifyJwt(accessToken);

    if (decoded) {
        res.locals.user = decoded;
        return next();
    }
    return next();
}

export { deserializeUser }