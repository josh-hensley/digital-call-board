import { Router, Request, Response } from 'express';
import { Post, Comment, User } from '../../models/index.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const newPost = await Post.create(req.body);
        console.log('New post created:', newPost.id);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const posts = await Post.findAll(
            {
                include: [
                    {
                        model: User,
                        attributes: ['id', 'firstName', 'lastName']
                    }, 
                    {
                        model: Comment,
                        attributes: ['id', 'content', 'createdAt'],
                        include: [{ model: User, attributes: ['id', 'firstName', 'lastName'] }]
                    }],
                    attributes: ['id', 'content', 'createdAt']
            });
        res.json(posts);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id, {
            include: [
                { model: User, attributes: ['id', 'firstName', 'lastName'] },
                {
                    model: Post, as: 'Comments', include: [
                        { model: User, as: 'Author' }
                    ]
                }
            ]
        });
        if (!post) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        await Post.update(req.body, { where: { id } });
        const updatedPost = await Post.findByPk(id);
        if (!updatedPost) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedpost = await Post.destroy({ where: { id } });
        if (!deletedpost) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json({ message: `post: ${deletedpost} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
});

export default router;