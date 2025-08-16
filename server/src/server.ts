import express from 'express';
import type { Request, Response } from 'express';
import db from './config/connection.js'
import { authenticateToken } from './utils/auth.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '../client/build')));
app.use(/(.*)/, (_req: Request, res: Response) => {
  res.sendFile(join(__dirname, '../client/build/index.html'));
});

const PORT = process.env.PORT || 3001;

const server = app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
});

if (process.exitCode) {
  server.close(() => {
    console.log('Server closed due to an error');
    process.exit(1);
  });
}