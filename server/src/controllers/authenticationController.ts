import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/user";
import { authenticaion, random } from "../helpers";
import { sign } from "jsonwebtoken";
import { UserData } from "models/user";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select("+authenticaion.salt +authenticaion.password");
    if (!user) {
      return res.sendStatus(401);
    }
    const expectedHash = authenticaion(user.authenticaion.salt, password);
    if (user.authenticaion.password != expectedHash) {
      return res.sendStatus(401);
    }
    const payload: UserData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };
    const token = sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
    return res.json({ token: token });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      return res.sendStatus(400);
    }
    const existingUser = await getUserByEmail(email);
    if (existingUser) {
      return res.sendStatus(409);
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
