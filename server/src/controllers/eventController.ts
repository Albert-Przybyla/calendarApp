import { createEvent, getEventById, getEventsForUser } from "../db/event";
import { Request, Response } from "express";
import { get } from "lodash";

export const createEventReq = async (req: Request, res: Response) => {
  try {
    const { name, description, start, end, calendarId } = req.body;
    if (!name || !start || !end) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Event = await createEvent({
      name,
      description,
      start,
      end,
      ownerId: currentUserId,
      calendarId,
    });
    return res.status(200).json(Event).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateEventReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, start, end, calendarId } = req.body;
    if (!name || !start || !end) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Event = await getEventById(id);
    if (Event.ownerId !== currentUserId) {
      return res.sendStatus(404);
    }
    Event.name = name;
    Event.description = description;
    Event.start = start;
    Event.end = end;
    Event.calendarId = calendarId;
    await Event.save();
    return res.status(200).json(Event).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getEventsForUserReq = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Events = await getEventsForUser(currentUserId);
    return res.status(200).json(Events);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
