import { Post, User } from '../models/index.js';
import process from 'process';

const cleanDb = async (): Promise<void> => {
  try {
    // Delete documents from Post collection
    await Post.deleteMany({});
    console.log('Post collection cleaned.'); 

    // Delete documents from User collection
    await User.deleteMany({});
    console.log('User collection cleaned.');

  } catch (err) {
    console.error('Error cleaning collections:', err);
    process.exit(1);
  }
};

export default cleanDb;
