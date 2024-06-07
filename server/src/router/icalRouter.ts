import { getIcalEventsForUserReq } from "../controllers/icalController";
import express from "express";

export default (router: express.Router) => {
  router.get("/ical", getIcalEventsForUserReq);
};
