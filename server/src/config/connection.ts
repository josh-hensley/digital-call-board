import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

const db = new Sequelize(
  DB_NAME || '',
  DB_USER || '',
  DB_PASSWORD || '',
  {
    dialect: 'postgres',
    host: DB_HOST || 'localhost'
  }
);

export default db;
