import { Schema, model, Document } from 'mongoose';

interface IComment extends Document {
  commentText: string;
  commentAuthor: string;
  createdAt: Date;
}

interface IPost extends Document {
  postText: string;
  postAuthor: string;
  createdAt: Date;
  comments: IComment[];
}

const commentSchema = new Schema<IComment>(
  {
    commentText: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280,
    },
    commentAuthor: {
        type: String,
        required: true,
    }
  },
  {
    _id: false,
    toJSON: { getters: true },
    toObject: { getters: true },
    timestamps: true,
  }
);

const postSchema = new Schema<IPost>(
  {
    postText: {
      type: String,
      required: true,
      trim: true,
    },
    postAuthor: {
      type: String,
      required: true,
      trim: true,
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
    toJSON: { getters: true },
    toObject: { getters: true },
  }
);

const post = model<IPost>('Post', postSchema);

export default post;
