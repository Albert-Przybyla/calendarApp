import express from "express";
import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../db/user";

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = (get(req, "identity._id") as String).toString();
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    if (currentUserId != id) {
      return res.sendStatus(403);
    }
    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies[process.env.TOKEN || "TOKEN"];
    if (!sessionToken) {
      return res.sendStatus(403);
    }
    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      return res.sendStatus(403);
    }
    merge(req, { identity: existingUser });
    return next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
