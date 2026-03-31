import { Schema, model } from "mongoose";
import RehearsalBreak from "./RehearsalBreak";

interface IReport {
    createdAt: Date;
    date: Date;
    rehearsalStart: string;
    breaks?: typeof RehearsalBreak[];
    rehearsalEnd: string
    present: string[];
    absent?: string[];
    rehearsalNotes?: string;
    costumes?: string;
    lights?: string;
    properties?: string;
    sound?: string;
    scenery?: string;

}

const reportSchema = new Schema<IReport>({
    createdAt: {
        type: Date,
        default: Date.now
    },
    date: Date,
    rehearsalStart: String,
    breaks: [ RehearsalBreak ],
    rehearsalEnd: String,
    present: [ String ],
    absent: [ String ],
    rehearsalNotes: String,
    costumes: String,
    lights: String,
    properties: String,
    sound: String,
    scenery: String
})

const Report = model<IReport>("Report", reportSchema)

export default Report;