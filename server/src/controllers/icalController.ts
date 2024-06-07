import { getEventsForUser } from "../db/event";
import { getUserById } from "../db/user";
import { Request, Response } from "express";

export const getIcalEventsForUserReq = async (req: Request, res: Response) => {
  try {
    const { id, key } = req.query;
    const userId = String(id);
    const userKey = String(key);
    if (!userId || !userKey) {
      return res.sendStatus(403);
    }
    const user = await getUserById(userId);
    if (!user.key || user.key != userKey) {
      return res.sendStatus(403);
    }
    const Events = await getEventsForUser(userId);
    return res.status(200).json(Events);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
