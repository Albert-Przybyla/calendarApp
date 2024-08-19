import {
  createSmtpConfigReq,
  getSmtpConfigForUserReq,
  updateSmtpConfigReq,
} from "../controllers/smtpConfigController";
import { isAuthenticated } from "../middlewares";
import express from "express";

export default (router: express.Router) => {
  router.post("/smtp-config", isAuthenticated, createSmtpConfigReq);
  router.get("/smtp-config", isAuthenticated, getSmtpConfigForUserReq);
  router.put("/smtp-config/:id", isAuthenticated, updateSmtpConfigReq);
};
