import { string, object } from 'zod'

const createSessionSchema = object({
    body: object({
        email: string({ required_error: "Email is required" }).email(),
        password: string({ required_error: "Password is required" }),
    })
})

export { createSessionSchema }