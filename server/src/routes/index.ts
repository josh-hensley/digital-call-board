import { Router } from 'express';
import apiRoutes from './Api/index.js';
import authRoutes from './Auth/index.js'

const router = Router();

router.use('/api', apiRoutes);
router.use('/auth', authRoutes)

export default router;