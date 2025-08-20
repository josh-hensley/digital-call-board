import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Report from './Report.js'

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

export { User, Post, Comment, Report };