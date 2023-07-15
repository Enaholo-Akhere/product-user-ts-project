import express, { Request, Response } from 'express';
const router = express.Router();
import Joi from 'joi'
import validateUser from '../DTO_validations/user_object_validation';
import { winston_logger } from '../utils/logger';
import { zod, zodObj } from '../DTO_validations/user.zod.validation';

interface user_interface {
    name: string;
    password: string;
    email: string;
}

router.post("/healthcheck", (req: Request, res: Response) => {
    console.log(req.body)

    res.send(req.body)
});

export default router;