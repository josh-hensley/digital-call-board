import { Schema, model } from "mongoose";

interface IPost {
    createdAt: Date;
    content: string;
}

const postSchema = new Schema<IPost>({
    content: String,
    createdAt: Date
})

const Post = model("Post", postSchema)

export default Post;
