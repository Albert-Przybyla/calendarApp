import express from "express";
import { login, refresh, register } from "../controllers/authenticationController";

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
  router.post("/auth/refresh", refresh);
};
