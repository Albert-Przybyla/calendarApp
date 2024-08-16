import { countTasksForUser, createTask, getTaskById, getTasksForUserPaged } from "../db/task";
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
      done: false,
      ownerId: currentUserId,
    });
    return res.status(200).json(Task).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateTaskReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, description, date, done } = req.body;
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
    Task.done = done;
    await Task.save();
    return res.status(200).json(Task).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getTasksForUserReq = async (req: Request, res: Response) => {
  try {
    const { pageNumber, pageSize, date } = req.query;
    const page = Number(pageNumber) || 1;
    const size = Number(pageSize) || 10;
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const totalEvents = await countTasksForUser(currentUserId);
    const maxPage = Math.ceil(totalEvents / size);
    const Tasks = await getTasksForUserPaged(
      currentUserId,
      page,
      size,
      date ? new Date(String(date)) : undefined
    );
    return res.status(200).json({
      pageNumber: page,
      maxPage: maxPage,
      items: Tasks,
    });
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
