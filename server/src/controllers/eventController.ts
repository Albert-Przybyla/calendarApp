import { createEvent, getEventById, getEventsForUser } from "../db/event";
import express from "express";
import { get } from "lodash";

export const createEventReq = async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, start, end } = req.body;
    if (!name || !start || !end) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Event = await createEvent({
      name,
      description,
      start,
      end,
      ownerId: currentUserId.toString(),
    });
    return res.status(200).json(Event).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateEventReq = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, description, start, end } = req.body;
    if (!name || !start || !end) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Event = await getEventById(id);
    if (Event.ownerId !== currentUserId.toString()) {
      return res.sendStatus(404);
    }
    Event.name = name;
    Event.description = description;
    Event.start = start;
    Event.end = end;
    await Event.save();
    return res.status(200).json(Event).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getEventsForUserReq = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Events = await getEventsForUser(currentUserId.toString());
    return res.status(200).json(Events);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
