import { User, Post } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import bcrypt from 'bcrypt'

interface UserArgs {
    username: string;
};

interface PostArgs {
    postId: string;
};

interface addUserArgs {
    input: {
        username: string;
        email: string;
        password: string;
    }
};

interface loginUserArgs {
    username: string;
    password: string;
};

interface addPostArgs {
    input: {
        postText: string;
        postAuthor: string;
    }
};

interface addCommentArgs {
    postId: string;
    commentText: string;
    commentAuthor: string;
};

interface removeCommentArgs {
    postId: string;
    commentId: string
};

interface updatePasswordArgs {
    newPassword: string;
}

const resolvers = {
    Query: {
        users: async () => {
            return await User.find().populate('posts').sort({ name: 1 });
        },
        user: async (_parent: any, { username }: UserArgs) => {
            return await User.findOne({ username }).populate('posts');
        },
        posts: async () => {
            return await Post.find().populate('postAuthor').populate('comments.commentAuthor');
        },
        post: async (_parent: any, { postId }: PostArgs) => {
            return await Post.findById(postId).populate('postAuthor').populate('comments.commentAuthor');
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return await User.findById(context.user._id).populate('posts');
            }
            throw new Error('Not logged in');
        }
    },
    Mutation: {
        addUser: async (_parent: any, { input }: addUserArgs) => {
            const user = await User.create({ ...input });
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        login: async (_parent: any, { username, password }: loginUserArgs) => {
            const user = await User.findOne({ username });
            if (!user) {
                throw new AuthenticationError('Incorrect username');
            }
            const isCorrectPassword = await user.isCorrectPassword(password);
            if (!isCorrectPassword) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user.username, user.email, user._id);
            return { token, user };
        },
        addPost: async (_parent: any, { input }: addPostArgs, context: any) => {
            if (context.user) {
                const post = await Post.create({ ...input });
                await User.findOneAndUpdate(
                    { username: context.user.username },
                    {
                        $addToSet: { posts: post._id }
                    });
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addComment: async (_parent: any, { postId, commentText }: addCommentArgs, context: any) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: { comments: { commentText, commentAuthor: context.user.username } } },
                    { new: true, runValidators: true }
                );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removePost: async (_parent: any, { postId }: PostArgs, context: any) => {
            if (context.user) {
                const post = await Post.findOneAndDelete({
                    _id: postId,
                    postAuthor: context.user.username
                });
                if (!post) {
                    throw new AuthenticationError('Post not found');
                }
                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { posts: post._id } }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        removeComment: async (_parent: any, { postId, commentId }: removeCommentArgs, context: any) => {
            if (context.user) {
                const post = await Post.findOneAndUpdate(
                    { _id: postId },
                    {
                        $pull: {
                            comments: {
                                _id: commentId,
                                commentAuthor: context.user.username
                            }
                        }
                    },
                    { new: true }
                );
                return post;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        updatePassword: async (_parent: any, { newPassword }: updatePasswordArgs, context: any) => {
            let user = await User.findById(context.user._id);
            if (user) {
                const password = await bcrypt.hash(newPassword, 10)
                await user.updateOne({ $set: { password } })
                const token = signToken(user.username, user.email, user._id)
                return { token };
            }
            throw new AuthenticationError('You need to be signed in!')
        }
    }
};

export default resolvers;