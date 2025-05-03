import { Schema, model, Document } from 'mongoose';

interface IReport extends Document {
    date: string;
    rehearsalStart: string;
    break1: string;
    breakLength1: string;
    break2: string;
    breakLength2: string;
    rehearsalEnd: string
    rehearsalTime: string;
    attendance: string[];
    rehearsalNotes: string;
    costumes: string;
    lights: string;
    properties: string;
    sound: string;
    scenery: string;
}

const reportSchema = new Schema<IReport>({
    date: {
        type: String,
        required: true,
        trim: true
    },
    rehearsalStart: {
        type: String,
        required: true
    },
    break1: {
        type: String
    },
    breakLength1: {
        type: String
    },
    break2: {
        type: String
    },
    breakLength2: {
        type: String
    },
    rehearsalEnd: {
        type: String,
        required: true
    },
    rehearsalTime: {
        type: String,
        required: true
    },
    attendance: {
        type: [String],
        required: true
    },
    rehearsalNotes: {
        type: String
    },
    costumes: {
        type: String
    },
    lights: {
        type: String
    },
    properties: {
        type: String
    },
    sound: {
        type: String
    },
    scenery: {
        type: String
    }
},
    {
        timestamps: true,
        toJSON: { getters: true },
        toObject: { getters: true }
    }
);

const User = model<IReport>('Report', reportSchema);

export default User;