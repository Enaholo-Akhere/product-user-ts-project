import { z } from "zod";


//create schema for string

const mySchema = z.string();
const objSchema = z.object({
    name: z.string(),
    password: z.string(),
    email: z.string().email(),
})

const obj = { name: 'enaholo', user: 'akhere' }

function zod(message: string) {
    console.log(message)
    const result = mySchema.safeParse('testing with string');
    return result;
}

function zodObj(user: {}) {
    console.log(user)
    const result = objSchema.safeParse(user);
    //extract the inferred type
    // type myType = z.infer<typeof mySchema>
    // type objType = z.infer<typeof objSchema>
    return result;
}

export { zod, zodObj }