import express from "express";
import { createUser, getUserByEmail } from "../db/user";
import { authenticaion, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select("+authenticaion.salt +authenticaion.password");
    if (!user) {
      return res.sendStatus(400);
    }
    const expectedHash = authenticaion(user.authenticaion.salt, password);
    if (user.authenticaion.password != expectedHash) {
      return res.sendStatus(403);
    }
    const salt = random();
    user.authenticaion.sessionToken = authenticaion(salt, user._id.toString());
    await user.save();
    res.cookie(process.env.TOKEN || "TOKEN", user.authenticaion.sessionToken, {
      domain: "localhost",
      path: "/",
    });

    return res.status(200).json(user).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(400);
    }
    const salt = random();
    const user = await createUser({
      email,
      username,
      authenticaion: {
        salt,
        password: authenticaion(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
