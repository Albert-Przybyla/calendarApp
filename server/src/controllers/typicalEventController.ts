import { createTypicalEvent, getTypicalEventById, getTypicalEventsForUser } from "../db/typical_event";
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

export const getTypicalEventsForUserReq = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvents = await getTypicalEventsForUser(currentUserId);
    return res.status(200).json(typicalEvents);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
