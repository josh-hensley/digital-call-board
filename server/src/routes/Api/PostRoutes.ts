import { Router, Request, Response } from 'express';
import { Post } from '../../models';

const router = Router();

router.post('post/new', async (req: Request, res: Response) => {
    try {
        const newPost = await Post.create(req.body);
        console.log('New post created:', newPost.id);
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({ message: 'Error creating post', error });
    }
});

router.get('/posts', async (_req: Request, res: Response) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching posts' });
    }
});

router.get('/post/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const post = await Post.findByPk(id);
        if (!post) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post' });
    }
});

router.put('/post/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const updatedPost = await Post.update({...req.body}, {where: { id }});
        if (!updatedPost) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json(updatedPost);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
});

router.delete('/posts/:id', async (req: Request, res: Response): Promise<void> => {
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