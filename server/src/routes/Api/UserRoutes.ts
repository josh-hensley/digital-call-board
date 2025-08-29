import { Router, Request, Response } from 'express';
import { User, Post, Comment } from '../../models/index.js';

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
        const users = await User.findAll(
            {
                include: [
                    {
                        model: Post,
                        attributes: ['content', 'createdAt']
                    },
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'createdAt'],
                        include: [{
                            model: Post,
                            attributes: ['id', 'content'],
                            include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
                        }]
                    }]
            });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users' });
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const user = await User.findByPk(id, {
            include: [
                {
                    model: Post,
                    attributes: ['content', 'createdAt']
                },
                {
                    model: Comment,
                    attributes: ['id', 'content', 'createdAt'],
                    include: [{
                        model: Post,
                        attributes: ['id', 'content'],
                        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
                    }]
                }]
        });
        if (!user) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await User.update({ ...req.body }, { where: { id } });
        const updatedUser = await User.findByPk(id);
        if (!updatedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByPk(id);
        await User.destroy({ where: { id } });
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: `User: ${deletedUser?.getFullName()} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

export default router;