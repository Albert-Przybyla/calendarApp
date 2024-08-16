import {
  countTypicalEventsForUser,
  createTypicalEvent,
  getTypicalEventById,
  getTypicalEventsForUser,
  deleteTypicalEventById,
  getTypicalEventsForUserPaged,
} from "../db/typical_event";
import { Request, Response } from "express";
import { get } from "lodash";

export const createTypicalEventReq = async (req: Request, res: Response) => {
  try {
    const { name, description, duration, calendarId } = req.body;
    if (!name || !duration) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvent = await createTypicalEvent({
      name,
      description,
      duration,
      ownerId: currentUserId,
      calendarId,
    });
    return res.status(200).json(typicalEvent).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateTypicalEventReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, duration, calendarId } = req.body;
    if (!name || !duration) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvent = await getTypicalEventById(id);
    if (typicalEvent.ownerId !== currentUserId) {
      return res.sendStatus(404);
    }
    typicalEvent.name = name;
    typicalEvent.description = description;
    typicalEvent.duration = duration;
    typicalEvent.calendarId = calendarId;
    await typicalEvent.save();
    return res.status(200).json(typicalEvent).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const deleteTypicalEventReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvent = await getTypicalEventById(id);
    if (typicalEvent.ownerId !== currentUserId) {
      return res.sendStatus(404);
    }
    const status = await deleteTypicalEventById(id);

    return res.status(200).json(status).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getTypicalEventsForUserReq = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize } = req.query;
    const page = Number(pageNumber) || 1;
    const size = Number(pageSize) || 10;
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const totalEvents = await countTypicalEventsForUser(currentUserId);
    const maxPage = Math.ceil(totalEvents / size);
    const typicalEvents = await getTypicalEventsForUserPaged(currentUserId, page, size);
    return res.status(200).json({
      pageNumber: page,
      maxPage: maxPage,
      items: typicalEvents,
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
