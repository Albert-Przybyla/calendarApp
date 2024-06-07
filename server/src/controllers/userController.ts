import { Request, Response } from "express";
import { deleteUserById, getUserById, getUsers } from "../db/user";

export const getAllUsers = async (req: Request, res: Response, user: any) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.sendStatus(400);
    }

    const deleteUser = await deleteUserById(id);

    return res.json(deleteUser);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { username } = req.body;
    if (!username) {
      return res.sendStatus(400);
    }
    if (!id) {
      return res.sendStatus(400);
    }

    const user = await getUserById(id);
    user.username = username;
    await user.save();
    return res.status(200).json(user).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const generateKey = async (req: Request, res: Response) => {
  try {
    const user = await getUserById(req.user.id);
    user.key = Array.from({ length: 20 }, () =>
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * 62))
    ).join("");
    await user.save();
    return res.status(200).json({ id: user.id, key: user.key }).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
