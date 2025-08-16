import { Router, Request, Response } from 'express';
import { signToken, authenticateToken } from '../../utils/auth.js';
import { User } from '../../models/index.js';

const router = Router();

router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400).json({ message: 'Username and password are required' });
    }

    const user = await User.findOne({ email, password });

    if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
    }

    // Generate a token for the user
    const token = signToken(user.email, user._id, user.name);

    res.json({ token });
});

router.get('/me', async (req: Request, res: Response): Promise<void> => {
    const authenticatedReq = authenticateToken({ req });

    if (!authenticatedReq.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }

    const user = await User.findById(authenticatedReq.user._id);

    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }

    res.json(user);
});

export default router;