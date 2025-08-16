import { Router, Request, Response } from 'express';
import { Post } from '../../models';

const router = Router();

router.get('/posts', async (_req: Request, res: Response) => {
    const data = await Post.find({}, null, { sort: { createdAt: -1 } });
    res.json(data);
});

router.get('/posts/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const data = await Post.findById(id);
    if (!data) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.json(data);
    return;
});

router.post('/posts', async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
        return;
    }
    const newPost = new Post({ title, content });
    await newPost.save();
    res.status(201).json(newPost);
});

router.put('/posts/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(id, { title, content }, { new: true });
    if (!updatedPost) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.json(updatedPost);
});

router.delete('/posts/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const deletedPost = await Post.findByIdAndDelete(id);
    if (!deletedPost) {
        res.status(404).json({ message: 'Post not found' });
        return;
    }
    res.json({ message: 'Post deleted successfully' });
});

export default router;