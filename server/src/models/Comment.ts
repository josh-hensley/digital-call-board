import { Schema, model } from "mongoose";

interface IComment {
    author: string;
    content: string;
    createdAt: Date;
}

const commentSchema = new Schema<IComment>({
    author: String,
    content: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Comment = model<IComment>('Comment', commentSchema)

export default Comment;
