import { createSmtpConfig, getSmtpConfigById, getSmtpConfigForUser } from "../db/smtpConfig";
import { Request, Response } from "express";
import { get } from "lodash";

export const createSmtpConfigReq = async (req: Request, res: Response) => {
  try {
    const { host, port, secure, user, password } = req.body;
    if (!host || !port || !user || !password) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const SmtpConfig = await createSmtpConfig({
      host,
      port,
      secure,
      user,
      password,
      ownerId: currentUserId,
    });
    return res.status(200).json(SmtpConfig).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const updateSmtpConfigReq = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { host, port, secure, user, password } = req.body;
    if (!host || !port || !user || !password) {
      return res.sendStatus(400);
    }
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const smtpConfig = await getSmtpConfigById(id);
    if (smtpConfig.ownerId !== currentUserId) {
      return res.sendStatus(404);
    }
    smtpConfig.host = host;
    smtpConfig.port = port;
    smtpConfig.secure = secure;
    smtpConfig.user = user;
    smtpConfig.password = password;
    await smtpConfig.save();
    return res.status(200).json(smtpConfig).end();
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};

export const getSmtpConfigForUserReq = async (req: Request, res: Response) => {
  try {
    const currentUserId = req.user?.id;
    if (!currentUserId) {
      return res.sendStatus(403);
    }
    const SmtpConfig = await getSmtpConfigForUser(currentUserId);
    return res.status(200).json(SmtpConfig);
  } catch (err) {
    console.error(err);
    return res.sendStatus(400);
  }
};
