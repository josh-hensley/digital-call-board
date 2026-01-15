import { Router, Request, Response } from 'express';
import { Report, RehearsalBreak } from '../../models/index.js';

const router = Router();

router.get('/', async (_req, res) => {
    try {
        const reports = await Report.findAll({
            include: [
                {
                    model: RehearsalBreak,
                    attributes: ['time', 'length']
                }
            ]
        });
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching reports' });
    }
});

router.get('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        const report = await Report.findByPk(id, {
            include: [
                {
                    model: RehearsalBreak,
                    attributes: ['time', 'length']
                }
            ]
        });
        if (!report) {
            res.status(404).json({ message: 'Report not found' });
        }
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching report' });
    }
});

router.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const newReport = await Report.create(req.body, {
            include: [
                {
                    model: RehearsalBreak
                }
            ]
        });
        console.log('New report created:', newReport.id);
        res.status(201).json(newReport);
    } catch (error) {
        console.error('Error creating report:', error);
        res.status(500).json({ message: 'Error creating report' });
    }
});

router.put('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params as { id: string };
    try {
        await Report.update(req.body, { where: { id } });
        const updatedReport = await Report.findByPk(id);
        if (!updatedReport) {
            res.status(404).json({ message: 'post not found' });
        }
        res.json(updatedReport);
    } catch (error) {
        res.status(500).json({ message: 'Error updating post' });
    }
});

router.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    const { id } = req.params;
    try {
        const deletedReport = await Report.destroy({ where: { id } });
        if (!deletedReport) {
            res.status(404).json({ message: 'report not found' });
        }
        res.json({ message: `report: ${deletedReport} deleted successfully` });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting post' });
    }
});

export default router;