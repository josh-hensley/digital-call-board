import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_URI } = process.env;

const db = new Sequelize(DB_URI || '');

export default db;
