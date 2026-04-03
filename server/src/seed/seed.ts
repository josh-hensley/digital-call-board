import db from "../config/connection.js";
import { User } from '../models/index.js';
import users from './users.json' with { type: "json" };
const seedDatabase = async () => {
    try {
        await db();
        console.log('Database synced successfully');

        await User.insertMany(users);

        console.log('Database seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

seedDatabase()