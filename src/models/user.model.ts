import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import config from 'config';

export interface userInterface {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
    comparePassword: (userPassword: string) => Boolean;
}

const userSchema = new mongoose.Schema<userInterface>({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true }
}, { timestamps: true });

userSchema.pre("save", async function (next: (err?: Error) => void) {
    let user = this;
    if (!user.isModified("password")) {
        return next();
    }
    const salt = await bcrypt.genSalt(config.get('saltWorkFactor'));

    const hash = await bcrypt.hash(user.password, salt);

    user.password = hash

    return next();
})

userSchema.methods.comparePassword = async function (userPassword: string): Promise<boolean> {
    const user = this;

    const result = await bcrypt.compare(userPassword, user.password)
    return result;
}

const Usermodel = mongoose.model<userInterface>('User', userSchema)

export default Usermodel; 