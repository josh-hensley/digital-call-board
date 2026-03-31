import { Router, Request, Response } from "express";
import { Event } from "../../models/index.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const { date } = req.query;
    const events = date
      ? await Event.find({
          where: { date },
        })
      : await Event.find({});
    res.json(events);
  } catch (error: any) {
    res
      .status(500)
      .json({
        message: `Error fetching events: ${error.message ? error.message : error}`,
      });
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ message: "Error fetching event" });
  }
});

router.post("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const newEvent = await Event.create(req.body);
    console.log("New event created:", newEvent.id);
    res.status(201).json(newEvent);
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ message: "Error creating event" });
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params as { id: string };
  try {
    const updatedEvent = await Event.findByIdAndUpdate(id, req.body);
    if (!updatedEvent) {
      res.status(404).json({ message: "post not found" });
    }
    res.json(updatedEvent);
  } catch (error) {
    res.status(500).json({ message: "Error updating post" });
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const deletedEvent = await Event.findByIdAndDelete(id);
    if (!deletedEvent) {
      res.status(404).json({ message: "event not found" });
    }
    res.json({ message: `event: ${deletedEvent} deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post" });
  }
});

export default router;
