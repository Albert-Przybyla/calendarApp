import {
  countEventsForUser,
  createEvent,
  getEventById,
  getEventsForUserPaged,
  getEventsForUserbyDates,
} from "../db/event";
import { Request, Response } from "express";

export const createEventReq = async (req: Request, res: Response) => {
  try {
    const { name, description, start, end, calendarId } = req.body;
    console.log({ name, description, start, end, calendarId });
    if (!name || !start || !end) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    console.log({ currentUserId });
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
    console.log({ Event });

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
    const { pageNumber, pageSize } = req.query;
    const page = Number(pageNumber) || 1;
    const size = Number(pageSize) || 10;
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const totalEvents = await countEventsForUser(currentUserId);
    const maxPage = Math.ceil(totalEvents / size);
    const Events = await getEventsForUserPaged(currentUserId, page, size);
    return res.status(200).json({
      pageNumber: page,
      maxPage: maxPage,
      items: Events,
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getEventsForUserByDatesReq = async (req: Request, res: Response) => {
  try {
    if (!req.body.start || !req.body.end) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    const start = new Date(req.body.start);
    const end = new Date(req.body.end);
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Events = await getEventsForUserbyDates(currentUserId, start, end);
    return res.status(200).json(Events);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
