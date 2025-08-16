import { Router } from 'express';
import loginRoutes from './Login.js';

const router = Router();

router.use('/login', loginRoutes);

export default router;
