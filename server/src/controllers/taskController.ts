import { createTask, getTaskById, getTasksForUser } from "../db/task";
import { Request, Response } from "express";

export const createTaskReq = async (req: Request, res: Response) => {
  try {
    const { name, description, date } = req.body;
    if (!name || !date) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Task = await createTask({
      name,
      description,
      date,
      ownerId: currentUserId,
    });
    return res.status(200).json(Event).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateTaskReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, date } = req.body;
    if (!name || !date) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Task = await getTaskById(id);
    if (Task.ownerId !== currentUserId) {
      return res.sendStatus(404);
    }
    Task.name = name;
    Task.description = description;
    Task.date = date;
    await Task.save();
    return res.status(200).json(Task).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getTasksForUserReq = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const Tasks = await getTasksForUser(currentUserId);
    return res.status(200).json(Tasks);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
