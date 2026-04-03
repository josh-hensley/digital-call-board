import { Router, Request, Response } from 'express';
import { User } from '../../models/index.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        console.log(req.body)
        const newUser = await User.create(req.body);
        console.log('New user created:', newUser.id);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const users = await User.find();

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        const user = await User.findById(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        const updatedUser = await User.findByIdAndUpdate(id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        const deletedCount = await User.findByIdAndDelete(id);
        if (!deletedCount) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

export default router;