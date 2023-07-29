import Usermodel, { userInterface } from '../models/user.model';
import _ from 'lodash'
import { FilterQuery } from 'mongoose';

interface validatePasswordInterface {
    email: string;
    password: string;
}

const createUser = async (input: userInterface) => {
    try {
        const user = new Usermodel(input);
        await user.save()
        console.log("new user", user)
        return _.omit(user.toJSON(), ['password'])
    }
    catch (e: any) {
        throw new Error(e)
    }
};

const validatePassword = async ({ email, password }: validatePasswordInterface) => {
    const user = await Usermodel.findOne({ email });
    if (!user) return false;

    const isVerified = await user?.comparePassword(password);
    if (!isVerified) return false;
    console.log('is verified', isVerified);
    return _.omit(user.toJSON(), ['password'])
};

const findUser = async (query: FilterQuery<userInterface>) => {
    return await Usermodel.findOne(query).lean();
}


export { createUser, validatePassword, findUser };