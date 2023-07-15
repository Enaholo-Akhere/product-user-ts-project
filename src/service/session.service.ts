import SessionModel, { sessionInterface } from "../models/session.model"
import mongoose, { FilterQuery } from "mongoose";

const createSession = async (userId: mongoose.Types.ObjectId, userAgent: string) => {
    const session = await SessionModel.create({ user: userId, userAgent });
    return session.toJSON();
}

const findSessions = async (query: FilterQuery<sessionInterface>) => {
    return SessionModel.find(query).lean();
};

export { createSession, findSessions }