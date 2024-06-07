import { isAuthenticated, isOwner } from "../middlewares";
import { deleteUser, generateKey, getAllUsers, updateUser } from "../controllers/userController";
import express from "express";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.delete("/user/:id", isAuthenticated, isOwner, deleteUser);
  router.put("/user/:id", isAuthenticated, isOwner, updateUser);
  router.get("/user/key", isAuthenticated, generateKey);
};
