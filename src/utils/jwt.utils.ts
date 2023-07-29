import config from 'config';
import jwt from 'jsonwebtoken';
import { winston_logger } from './logger';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: 'RS256',
    })
}

const verifyJwt = async (token: string) => {

    try {

        const decoded = await jwt.verify(token, publicKey);

        return {
            valid: true,
            expired: false,
            decoded,
        }
    }
    catch (e: any) {
        winston_logger.error(e.message, e.stack)
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}

export { verifyJwt, signJwt }