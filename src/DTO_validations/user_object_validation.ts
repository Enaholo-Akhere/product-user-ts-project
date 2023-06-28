import Joi from 'joi'

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

export default validateUser;