import { Request, Response } from "express";
import { createUser, getUserByEmail } from "../db/user";
import { authenticaion, random } from "../helpers";
import { sign } from "jsonwebtoken";
import { UserData } from "models/user";
import { verify } from "jsonwebtoken";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.sendStatus(400);
    }
    const user = await getUserByEmail(email).select(
      "+authenticaion.salt +authenticaion.password +authenticaion.refreshToken"
    );
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
    const refreshToken = sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "4h" });
    user.authenticaion.refreshToken = refreshToken;
    await user.save();
    return res.json({ token: token, refreshToken: refreshToken }).end();
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

export const refresh = async (req: Request, res: Response) => {
  try {
    const { token, refreshToken } = req.body;

    if (!refreshToken || !token) {
      return res.sendStatus(400);
    }

    const decodedData = await new Promise<UserData>((resolve, reject) => {
      verify(refreshToken, process.env.REFRESH_TOKEN, { ignoreExpiration: false }, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data as UserData);
        }
      });
    });

    const user = await getUserByEmail(decodedData.email).select("+authenticaion.refreshToken");

    if (!user || user.authenticaion.refreshToken !== refreshToken) {
      return res.sendStatus(401);
    }

    const payload: UserData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const newToken = sign(payload, process.env.ACCESS_TOKEN, { expiresIn: "1h" });
    const newRefreshToken = sign(payload, process.env.REFRESH_TOKEN, { expiresIn: "4h" });

    user.authenticaion.refreshToken = refreshToken;
    await user.save();

    return res.json({ accessToken: newToken, refreshToken: newRefreshToken }).end();
  } catch {
    return res.sendStatus(400);
  }
};
