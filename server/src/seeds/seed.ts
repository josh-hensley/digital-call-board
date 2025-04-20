import db from '../config/connection.js';
import { User, Post } from '../models/index.js';
import cleanDb from './cleanDb.js';

import userData from './userData.json' assert { type: 'json'};
import postData from './samplePosts.json' assert { type: 'json'};

const seedDatabase = async (): Promise<void> => {
  try {
    await db();
    await cleanDb();

    await User.create(userData);
    await Post.create(postData);
    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
