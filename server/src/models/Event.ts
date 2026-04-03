import { Schema, model } from "mongoose";

interface IEvent {
    date: Date;
    time: string;
    description: string;
}

const eventSchema = new Schema<IEvent>({
    date: Date,
    time: String,
    description: String
})

const Event = model<IEvent>('Event', eventSchema)

export default Event;