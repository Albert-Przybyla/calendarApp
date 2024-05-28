import { createEventReq, getEventsForUserReq, updateEventReq } from "../controllers/eventController";
import { isAuthenticated } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.post("/event", isAuthenticated, createEventReq);
  router.get("/event", isAuthenticated, getEventsForUserReq);
  router.put("/event/:id", isAuthenticated, updateEventReq);
};
