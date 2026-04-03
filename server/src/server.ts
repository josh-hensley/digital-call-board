import express from 'express';
import type { Request, Response } from 'express';
import { apiRoutes, authRoutes } from './routes/index.js';
import db from './config/connection.js'

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../../client/dist')));
app.use('/api', apiRoutes);
app.use('/auth', authRoutes);
app.use(/(.*)/, (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../../client/dist/index.html'));
});

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT,async () => {
  await db();
  console.log(`API server running on port ${PORT}!`);
});

if (process.exitCode) {
  server.close(() => {
    console.log('Server closed');
    process.exit(1);
  });
}