import db from "../config/connection.js";

const cleanDatabase = async () => {
    try {
        await db.sync({ force: true });
        console.log('Database cleaned successfully');
    } catch (error) {
        console.error('Error cleaning database:', error);
    }
}

export default cleanDatabase;