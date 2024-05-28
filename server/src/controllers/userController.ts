import express from "express";
import { deleteUserById, getUserById, getUsers } from "../db/user";

export const getAllUsers = async (req: express.Request, res: express.Response) => {
  try {
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const deleteUser = async (req: express.Request, res: express.Response) => {
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

export const updateUser = async (req: express.Request, res: express.Response) => {
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
