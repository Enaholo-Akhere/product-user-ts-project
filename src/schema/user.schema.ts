import { object, string, TypeOf } from 'zod';

export const createUserSchema = object({
    body: object({
        name: string({ required_error: 'Name is required' }),
        password: string({ required_error: 'Password is required' }).min(6, "Password too short - Minimum character is 6"),
        passwordConfirmation: string({ required_error: 'Password confirmation is required' }),
        email: string({ required_error: 'Email is required' }).email()
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: "Passwords do not match",
        path: ["passwordConfirmation"],
    }),

})

export type CreateUserInputType = TypeOf<typeof createUserSchema>