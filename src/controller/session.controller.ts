import { Request, Response } from "express";
import { validatePassword } from "../service/user.service";
import { createSession, findSessions, updateSession } from "../service/session.service";
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
    const refreshToken = signJwt({ ...user, session: session._id }, { expiresIn: config.get('refreshTokenTtl') })

    //return access and refresh tokens
    return res.send({ accessToken, refreshToken })
};

const getUserSessionsHandler = async (req: Request, res: Response) => {

    const userId = res?.locals?.user?._id;


    const sessions = await findSessions({ user: userId, valid: true });

    return res.send(sessions)
}

const deleteSessionHandler = async (req: Request, res: Response) => {
    const sessionId = res?.locals?.user?.session;
    // console.log('sessionID', sessionId)

    await updateSession({ _id: sessionId }, { valid: false });
    return res.send({
        accessToken: null,
        refreshToken: null
    })
}

export { createUserSessionHandler, getUserSessionsHandler, deleteSessionHandler };    