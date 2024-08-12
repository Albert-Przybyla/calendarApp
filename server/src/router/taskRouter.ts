import { createTaskReq, getTasksForUserReq, updateTaskReq } from "../controllers/taskController";
import { isAuthenticated } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.post("/task", isAuthenticated, createTaskReq);
  router.get("/task", isAuthenticated, getTasksForUserReq);
  router.put("/task/:id", isAuthenticated, updateTaskReq);
};
