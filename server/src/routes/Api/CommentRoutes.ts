import { Router, Request, Response } from 'express';
import { Comment, Post, User } from '../../models/index.js';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    try {
        const newComment = await Comment.create(req.body);
        console.log('New comment created:', newComment.id);
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating comment', error });
    }
});

router.get('/', async (_req: Request, res: Response) => {
    try {
        const comments = await Comment.find(
            {
                include: {
                    model: User,
                    attributes: ['id', 'firstName', 'lastName']
                },
                attributes: ['id', 'content', 'createdAt']
            });
        res.json(comments);
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        const post = await Post.findById(id, {
            include: [
                { model: User, as: 'Author' },
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
    const { id } = req.params as { id: string };
    try {
        const updatedPost = await Post.findByIdAndUpdate(id, req.body);
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
        const deletedpost = await Post.findByIdAndDelete(id);
        if (!deletedpost) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json({ message: `post: ${deletedpost} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
});

export default router;