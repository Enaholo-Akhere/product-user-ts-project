
import { Response, Request } from "express";
import { winston_logger } from "../utils/logger";
import { createUser } from "../service/user.service";
import _ from 'lodash';
import { userInterface } from '../models/user.model';

const createUserHandler = async (req: Request<{}, {}, userInterface>, res: Response) => {
    try {
        const user = await createUser(req.body) //call create user service
        const user_data = _.omit(user, ["password"])
        return res.send(user_data);
    }
    catch (e: any) {
        winston_logger.error(e.message, e.stack);
        return res.status(409).send(e.message);
    }
}

export default createUserHandler;