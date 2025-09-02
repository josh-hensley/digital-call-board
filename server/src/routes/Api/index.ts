import PostRoutes from './PostRoutes.js';
import UserRoutes from './UserRoutes.js';
import ReportRoutes from './ReportRoutes.js';
import CommentRoutes from './CommentRoutes.js';
import EventRoutes from './EventRoutes.js'
import { Router } from 'express';

const router = Router();

router.use('/posts', PostRoutes);
router.use('/comments', CommentRoutes);
router.use('/users', UserRoutes);
router.use('/reports', ReportRoutes);
router.use('/events', EventRoutes)

export default router;;