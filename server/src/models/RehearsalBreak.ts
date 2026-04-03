import mongoose, { Schema, model } from "mongoose";

export interface IRehearsalBreak {
    time: string;
    length: number;
    reportId: mongoose.Types.ObjectId;
}

const rehearsalBreakSchema = new Schema<IRehearsalBreak>({
    time: String,
    length: Number,
    reportId: mongoose.Types.ObjectId
})

const RehearsalBreak = model<IRehearsalBreak>("RehearsalBreak", rehearsalBreakSchema)

export default RehearsalBreak