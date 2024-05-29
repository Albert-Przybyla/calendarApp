import { createCalendar, getCalendarById, getCalendarsForUser } from "../db/calendar";
import express from "express";
import { get } from "lodash";

export const createCalendarReq = async (req: express.Request, res: express.Response) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Caldendar = await createCalendar({
      name,
      color,
      ownerId: currentUserId.toString(),
    });
    return res.status(200).json(Caldendar).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateCalendarReq = async (req: express.Request, res: express.Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    if (!name || !color) {
      return res.sendStatus(400);
    }
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Caldendar = await getCalendarById(id);
    if (Caldendar.ownerId !== currentUserId.toString()) {
      return res.sendStatus(404);
    }
    Caldendar.name = name;
    Caldendar.color = color;
    await Caldendar.save();
    return res.status(200).json(Caldendar).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getCaldendarsForUserReq = async (req: express.Request, res: express.Response) => {
  try {
    const currentUserId = get(req, "identity._id") as String;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Caldendars = await getCalendarsForUser(currentUserId.toString());
    return res.status(200).json(Caldendars);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
