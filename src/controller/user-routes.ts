import express, { Request, Response } from 'express';
const router = express.Router();
import Joi from 'joi'
// import validateUser from '../DTO_validations/user_object_validation';

interface user_interface {
    name: string;
    password: string;
    email: string;
}
const validateUser = (user: user_interface) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(5).max(255).required(),
        name: Joi.string().min(5),
    })

    return { error, value } = schema.validate(user);
};

router.post("/healthcheck", (req: Request, res: Response) => {
    // const user = {
    //     name: 'Enaholo',
    //     password: '123456',
    //     email: 'enaholoa@gmail.com'
    // }
    const { error, value } = validateUser(req.body);
    if (error) return res.status(400).send('wrong details passed')

    res.send(value)
});

export default router;