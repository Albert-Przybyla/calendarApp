import { Request, Response, NextFunction } from "express";
import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../db/user";
import { verify } from "jsonwebtoken";
import { UserData } from "models/user";

declare global {
  namespace Express {
    interface Request {
      user: UserData;
    }
  }
}

export const isOwner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    if (!req.user || !req.user.id) {
      return res.sendStatus(401);
    }
    if (req.user.id != id) {
      return res.sendStatus(401);
    }
    next();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const isAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.sendStatus(401);
  }
  verify(token, process.env.ACCESS_TOKEN, { ignoreExpiration: false }, (err, data) => {
    if (err) {
      return res.sendStatus(401);
    }
    req.user = data as UserData;
    next();
  });
};
