import express from 'express';
import type { Request, Response } from 'express';
import { apiRoutes, authRoutes } from './routes/index.js';
import db from './config/connection.js'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Connect to the database
const testConnection = async () => {
  try {
    await db.authenticate();
    console.log('Database connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
}
testConnection();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../../client/dist')));
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use(/(.*)/, (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'));
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});

if (process.exitCode) {
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });
}