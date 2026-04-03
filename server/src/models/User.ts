import { Schema, model } from "mongoose";
// import bcrypt from "bcrypt";


type group = 'cast' | 'crew' | 'production'

interface IUser {
    createdAt: Date;
    updatedAt: Date;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    phone?: string;
    roles?: string[];
    age?: number;
    groups?: group[];
}

const userSchema = new Schema<IUser>(
    {
        firstName: String,
        lastName: String,
        email: String,
        password: String,
        phone: String,
        roles: [ String ],
        age: Number,
        groups: [ String ]
    })
    
const User = model<IUser>("User", userSchema)

export default User;