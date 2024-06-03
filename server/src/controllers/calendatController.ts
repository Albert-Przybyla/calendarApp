import { createCalendar, getCalendarById, getCalendarsForUser } from "../db/calendar";
import { Request, Response } from "express";
import { get } from "lodash";

export const createCalendarReq = async (req: Request, res: Response) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
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

export const updateCalendarReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    if (!name || !color) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Caldendar = await getCalendarById(id);
    if (Caldendar.ownerId !== currentUserId) {
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

export const getCaldendarsForUserReq = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Caldendars = await getCalendarsForUser(currentUserId);
    return res.status(200).json(Caldendars);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
