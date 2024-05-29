import {
  createCalendarReq,
  getCaldendarsForUserReq,
  updateCalendarReq,
} from "../controllers/calendatController";
import { isAuthenticated } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.post("/calendar", isAuthenticated, createCalendarReq);
  router.get("/calendar", isAuthenticated, getCaldendarsForUserReq);
  router.put("/calendar/:id", isAuthenticated, updateCalendarReq);
};
