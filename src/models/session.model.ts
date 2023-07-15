import mongoose from "mongoose";

export interface sessionInterface {
    user: mongoose.Schema.Types.ObjectId;
    valid: Boolean;
    userAgent: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

const sessionSchema = new mongoose.Schema<sessionInterface>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    valid: { type: Boolean, default: true },
    userAgent: { type: String }
}, { timestamps: true });





const SessionModel = mongoose.model('Session', sessionSchema)

export default SessionModel; 