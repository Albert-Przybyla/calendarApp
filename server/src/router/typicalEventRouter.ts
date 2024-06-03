import {
  createTypicalEventReq,
  getTypicalEventsForUserReq,
  updateTypicalEventReq,
} from "../controllers/typicalEventController";
import { isAuthenticated, isOwner } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.post("/typical-event", isAuthenticated, createTypicalEventReq);
  router.get("/typical-event", isAuthenticated, getTypicalEventsForUserReq);
  router.put("/typical-event/:id", isAuthenticated, updateTypicalEventReq);
};
