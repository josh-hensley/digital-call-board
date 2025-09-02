import db from "../config/connection.js";
import { User } from '../models/index.js';
import users from './users.json' assert { type: 'json' };

const seedDatabase = async () => {
    try {
        await db.sync({ force: true });
        console.log('Database synced successfully');

        await User.bulkCreate(users, {
            validate: true
        });

        console.log('Database seeded successfully');

        process.exit(0);
    } catch (error) {
        console.error('Error syncing database:', error);
    }
}

seedDatabase()