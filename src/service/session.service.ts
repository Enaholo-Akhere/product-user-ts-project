import SessionModel, { sessionInterface } from "../models/session.model"
import mongoose, { FilterQuery, UpdateQuery } from "mongoose";
import _ from 'lodash'
import { signJwt, verifyJwt } from "../utils/jwt.utils";
import { findUser } from "./user.service";
import config from "config";

const createSession = async (userId: mongoose.Types.ObjectId, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}

const findSessions = async (query: FilterQuery<sessionInterface>) => {
    return SessionModel.find(query).lean();
};

const updateSession = async (query: FilterQuery<sessionInterface>, update: UpdateQuery<sessionInterface>) => {
    // const updateSessionWithId = await SessionModel.updateOne(query, update);
    const updateSessionWithId = await SessionModel.findByIdAndUpdate(query, update);

    console.log('updateSessionWithId', updateSessionWithId);
    return updateSessionWithId;
}

const reIssueAccessToken = async (refreshToken: string) => {
    const { decoded } = await verifyJwt(refreshToken);

    if (!decoded || !_.get(decoded, "session")) return 'session.service token not decoded line 28'
    const session = await SessionModel.findById(_.get(decoded, "session"));

    if (!session || !session.valid) return 'session.service session not found line 32';

    const user = await findUser({ _id: session.user })

    if (!user) return 'session.service user not found line 36';

    return signJwt({ ...user, session: session._id }, { expiresIn: config.get('refreshTokenTtl') })


};

export { createSession, findSessions, updateSession, reIssueAccessToken }