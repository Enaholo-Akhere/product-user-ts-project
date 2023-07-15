import config from 'config';
import jwt from 'jsonwebtoken';

const privateKey = config.get<string>("privateKey");
const publicKey = config.get<string>("publicKey");

const signJwt = (object: Object, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        // algorithm: 'RS256',
    })
}

const verifyJwt = (token: string) => {
    try {
        const decoded = jwt.verify(token, publicKey);
        return {
            valid: true,
            expired: false,
            decoded,
        }
    }
    catch (e: any) {
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    }
}

export { verifyJwt, signJwt }