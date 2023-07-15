import express, { Request, Response } from 'express';
const router = express.Router();
import Joi from 'joi'
import validateUser from '../DTO_validations/user_object_validation';
import { winston_logger } from '../utils/logger';
import { zod, zodObj } from '../DTO_validations/user.zod.validation';
import createUserHandler from '../controller/user-controller';
import validate from '../DTO_validations/user_object_validation';
import { createUserSchema } from '../schema/user.schema';
import { createUserSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/sesson.schema';


router.post("/healthcheck", validate(createUserSchema), (req: Request, res: Response) => {
    console.log(req.body)

    res.send(req.body)
});

router.post('/api/user', validate(createUserSchema), createUserHandler);

router.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

router.get('/api/session', getUserSessionsHandler);

export default router;