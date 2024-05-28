import express from "express";
import { login, register } from "../controllers/authenticationController";

/**
 * @openapi
 * '/auth/register':
 *  post:
 *     tags:
 *     - Auth Controller
 *     summary: Create a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *            type: object
 *            required:
 *              - username
 *              - email
 *              - password
 *            properties:
 *              username:
 *                type: string
 *              email:
 *                type: string
 *              password:
 *                type: string
 *     responses:
 *      200:
 *        description: Created
 *      409:
 *        description: Conflict
 *      400:
 *        description: Data Error
 *      500:
 *        description: Data Error
 */

export default (router: express.Router) => {
  router.post("/auth/register", register);
  router.post("/auth/login", login);
};
