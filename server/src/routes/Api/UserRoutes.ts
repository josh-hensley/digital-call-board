import { Router } from 'express';
// import { User } from '../../models';

const router = Router();

// router.get('/users', async (_req: Request, res: Response) => {
//     try {
//         const users = await User.find({});
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching users' });
//     }
// });

// router.get('/users/:id', async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     try {
//         const user = await User.findById(id);
//         if (!user) {
//             res.status(404).json({ message: 'User not found' });
//         }
//         res.json(user);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching user' });
//     }
// });

// router.post('/users', async (req: Request, res: Response): Promise<void> => {
//     const { username, email } = req.body;
//     if (!username || !email) {
//         res.status(400).json({ message: 'Username and email are required' });
//     }
//     try {
//         const newUser = new User({ username, email });
//         await newUser.save();
//         res.status(201).json(newUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error creating user' });
//     }
// });

// router.put('/users/:id', async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     const { username, email } = req.body;
//     try {
//         const updatedUser = await User.findByIdAndUpdate(id, { username, email }, { new: true });
//         if (!updatedUser) {
//             res.status(404).json({ message: 'User not found' });
//         }
//         res.json(updatedUser);
//     } catch (error) {
//         res.status(500).json({ message: 'Error updating user' });
//     }
// });

// router.delete('/users/:id', async (req: Request, res: Response): Promise<void> => {
//     const { id } = req.params;
//     try {
//         const deletedUser = await User.findByIdAndDelete(id);
//         if (!deletedUser) {
//             res.status(404).json({ message: 'User not found' });
//         }
//         res.json({ message: 'User deleted successfully' });
//     } catch (error) {
//         res.status(500).json({ message: 'Error deleting user' });
//     }
// });

export default router;