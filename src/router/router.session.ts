import express, { Request, Response } from 'express';
const router = express.Router();
import createUserHandler from '../controller/user-controller';
import validate from '../DTO_validations/user_object_validation';
import { createUserSchema } from '../schema/user.schema';
import { createUserSessionHandler, deleteSessionHandler, getUserSessionsHandler } from '../controller/session.controller';
import { createSessionSchema } from '../schema/session.schema';
import requireUser from '../middleware/requireUser';


router.post("/healthcheck", validate(createUserSchema), (req: Request, res: Response) => {
    console.log(req.body)

    res.send(req.body)
});

router.post('/api/user', validate(createUserSchema), createUserHandler);

router.post('/api/sessions', validate(createSessionSchema), createUserSessionHandler);

router.get('/api/sessions', requireUser, getUserSessionsHandler);

router.delete("/api/sessions", requireUser, deleteSessionHandler)

export default router;