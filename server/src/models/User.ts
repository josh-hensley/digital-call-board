import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcrypt';

interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone: string;
    age: number;
    roles: string[];
    posts: string[];
    isCorrectPassword: (password: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Must match an email address!']
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    },
    phone: {
        type: String,
        length: 10
    },
    age: {
        type: Number,
        min: 1
    },
    roles: [
        {
            type: String,
        }
    ]
},
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);

userSchema.pre<IUser>('save', async function (next) {
    if (this.isNew) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
};

const User = model<IUser>('User', userSchema);

export default User;