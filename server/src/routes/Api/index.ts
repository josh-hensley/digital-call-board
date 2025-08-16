import PostRoutes from './PostRoutes.js';
import UserRoutes from './UserRoutes.js';
import ReportRoutes from './ReportRoutes.js';
import { Router } from 'express';

const router = Router();

router.use('/posts', PostRoutes);
router.use('/users', UserRoutes);
router.use('/reports', ReportRoutes);

export default router;;