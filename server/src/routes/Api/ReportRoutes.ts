import { Router, Request, Response } from 'express';
import { Report } from '../../models';

const router = Router();

router.get('/reports', async (_req, res) => {
    try {
        const reports = await Report.find({});
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

router.get('/reports/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const report = await Report.findById(id);
        if (!report) {
            res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report' });
    }
});

router.post('/reports', async (req: Request, res: Response): Promise<void> => {
    const { title, content } = req.body;
    if (!title || !content) {
        res.status(400).json({ message: 'Title and content are required' });
    }
    try {
        const newReport = new Report({ title, content });
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(500).json({ message: 'Error creating report' });
    }
});

router.put('/reports/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    const { title, content } = req.body;
    try {
        const updatedReport = await Report.findByIdAndUpdate(id, { title, content }, { new: true });
        if (!updatedReport) {
            res.status(404).json({ message: 'Report not found' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating report' });
    }
});

router.delete('/reports/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedReport = await Report.findByIdAndDelete(id);
        if (!deletedReport) {
            res.status(404).json({ message: 'Report not found' });
        }
        res.json({ message: 'Report deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting report' });
    }
});

export default router;