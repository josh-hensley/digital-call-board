import { Router, Request, Response } from 'express';
import { User } from '../../models';

const router = Router();

router.post('user/new', async (req: Request, res: Response) => {
    try {
        const newUser = await User.create(req.body);
        console.log('New user created:', newUser.id);
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error });
    }
});

router.get('/users', async (_req: Request, res: Response) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/user/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

router.put('/user/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedUser = await User.update({...req.body}, {where: { id }});
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

router.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id);
        const deletedUser = await User.destroy({ where: { id } });
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `${deletedUser}, User: ${user?.getFullName()} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

export default router;