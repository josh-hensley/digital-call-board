import User from './User.js';
import Post from './Post.js';
import Comment from './Comment.js';
import Report from './Report.js'
import RehearsalBreak from './RehearsalBreak.js';

User.hasMany(Post);
Post.belongsTo(User);

User.hasMany(Comment);
Comment.belongsTo(User);

Post.hasMany(Comment);
Comment.belongsTo(Post);

Report.hasMany(RehearsalBreak);
RehearsalBreak.belongsTo(Report)

export { User, Post, Comment, Report, RehearsalBreak };