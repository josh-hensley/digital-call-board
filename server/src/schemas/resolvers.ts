import { User, Post, Report } from '../models/index.js';
import { signToken, AuthenticationError } from '../utils/auth.js';
import bcrypt from 'bcrypt'

interface UserArgs {
    input: {
        _id: string;
        name: string;
        email: string;
        phone: string;
        age: number;
        roles: string[];
    }
}

interface SearchArgs {
    search: string;
}

interface PostArgs {
    postId: string;
};

interface ReportArgs {
    date: string;
}

interface addUserArgs {
    input: {
        name: string;
        email: string;
        phone: string;
        age: number;
        roles: string[];
    }
    password: string;
};

interface loginUserArgs {
    email: string;
    password: string;
};

interface addPostArgs {
    input: {
        postText: string;
        postAuthor: string;
    }
};

interface addReportArgs {
    input: {
        date: string;
        rehearsalStart: string;
        break1: string;
        breakLength1: string;
        break2: string;
        breakLength2: string;
        rehearsalEnd: string;
        rehearsalTime: string;
        attendance: string[];
        rehearsalNotes: string;
        costumes: string;
        lights: string;
        properties: string;
        sound: string;
        scenery: string;
    }
}

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
            return await User.find().sort({ name: 1 });
        },
        user: async (_parent: any, { search }: SearchArgs) => {
            return await User.findOne({
                name: {
                    $regex: new RegExp(search, 'i')
                }
            });
        },
        reports: async () => {
            return await Report.find().sort({ date: 1 });
        },
        report: async (_parent: any, { date }: ReportArgs) => {
            return await Report.findOne({ date })
        },
        posts: async () => {
            return await Post.find().populate('postAuthor').populate('comments.commentAuthor').sort({createdAt: -1});
        },
        post: async (_parent: any, { postId }: PostArgs) => {
            return await Post.findById(postId).populate('postAuthor').populate('comments.commentAuthor');
        },
        me: async (_parent: any, _args: any, context: any) => {
            if (context.user) {
                return await User.findById(context.user._id);
            }
            throw new Error('Not logged in');
        }
    },
    Mutation: {
        addUser: async (_parent: any, { input }: addUserArgs) => {
            const user = await User.create({ ...input });
            return user;
        },
        updateUser: async (_parent: any, { input }: UserArgs) => {
            const user = await User.findByIdAndUpdate(input._id, { ...input }, { new: true })
            return user;
        },
        login: async (_parent: any, { email, password }: loginUserArgs) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError('user not found!');
            }
            const isCorrectPassword = await user.isCorrectPassword(password);
            if (!isCorrectPassword) {
                throw new AuthenticationError('Incorrect password');
            }
            const token = signToken(user.email, user._id, user.name);
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
        addReport: async (_parent: any, { input }: addReportArgs, context: any) => {
            if (context.user) {
                const report = await Report.create({ ...input })
                return report
            }
            throw new AuthenticationError('You need to be logged in!')
        },
        addComment: async (_parent: any, { postId, commentText, commentAuthor }: addCommentArgs, context: any) => {
            if (context.user) {
                return Post.findOneAndUpdate(
                    { _id: postId },
                    { $addToSet: { comments: { commentText, commentAuthor } } },
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
                const token = signToken(user.email, user._id, user.name)
                return { token };
            }
            throw new AuthenticationError('You need to be signed in!')
        }
    }
};

export default resolvers;