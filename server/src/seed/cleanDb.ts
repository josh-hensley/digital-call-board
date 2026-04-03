import db from "../config/connection.js";
import { User, Post, Comment, Report, RehearsalBreak, Event } from '../models'

const cleanDatabase = async () => {
    try {
        await db();
        await User.deleteMany();
        await Post.deleteMany();
        await Comment.deleteMany();
        await Report.deleteMany();
        await RehearsalBreak.deleteMany();
        await Event.deleteMany()
        console.log('Database cleaned successfully');
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
}

export default cleanDatabase;