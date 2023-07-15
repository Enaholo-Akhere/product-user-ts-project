import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions } from "../service/session.service";
import { signJwt } from "../utils/jwt.utils";
import config from 'config';

const createUserSessionHandler = async (req: Request, res: Response) => {
    const user = await validatePassword(req.body);
    if (!user) {
        return res.status(401).send("Invalid email or password")
    }

    //create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    //create an access token
    const accessToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTtl') })

    //create refresh token
    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('accessTokenTtl') })

    //return access and refresh tokens
    return res.send({ accessToken, refreshToken })
};

const getUserSessionsHandler = async (req: Request, res: Response) => {
    const userId = res.locals.user._id;

    const sessions = await findSessions({ user: userId, valid: false });

    return res.send(sessions)
}

export { createUserSessionHandler, getUserSessionsHandler };    