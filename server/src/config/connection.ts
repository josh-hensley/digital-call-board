import dotenv from 'dotenv';
dotenv.config();

import { Sequelize } from 'sequelize';

const { DB_URI } = process.env;

const db = new Sequelize(DB_URI || '', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true
    }
  }
});

export default db;
