import express from "express";
import authenticationRouter from "./authenticationRouter";
import userRouter from "./userRouter";
import typicalEventRouter from "./typicalEventRouter";
import eventRouter from "./eventRouter";
import caldendarRouter from "./calendarRouter";

const router = express.Router();

export default (): express.Router => {
  authenticationRouter(router);
  userRouter(router);
  typicalEventRouter(router);
  eventRouter(router);
  caldendarRouter(router);
  return router;
};
