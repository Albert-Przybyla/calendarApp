import { createTypicalEvent, getTypicalEventById, getTypicalEventsForUser } from "../db/typical_event";
import express from "express";
import { get } from "lodash";

export const createTypicalEventReq = async (req: express.Request, res: express.Response) => {
  try {
    const { name, description, duration } = req.body;
    if (!name || !duration) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvent = await createTypicalEvent({
      name,
      description,
      duration,
      ownerId: currentUserId.toString(),
    });
    return res.status(200).json(typicalEvent).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateTypicalEventReq = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, description, duration } = req.body;
    if (!name || !duration) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvent = await getTypicalEventById(id);
    if (typicalEvent.ownerId !== currentUserId.toString()) {
      return res.sendStatus(404);
    }
    typicalEvent.name = name;
    typicalEvent.description = description;
    typicalEvent.duration = duration;
    await typicalEvent.save();
    return res.status(200).json(typicalEvent).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getTypicalEventsForUserReq = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const typicalEvents = await getTypicalEventsForUser(currentUserId.toString());
    return res.status(200).json(typicalEvents);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
