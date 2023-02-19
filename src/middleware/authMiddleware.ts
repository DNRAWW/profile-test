import { NextFunction, Request, Response } from "express";
import { dbConnection } from "../db/db-connection";
import { AuthService } from "../services/authService";
import { UsersService } from "../services/usersService";

export async function tryAuthenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const usersService = new UsersService(dbConnection);
  const authService = new AuthService(dbConnection, usersService);
  if (!req.headers.authorization) {
    return next();
  }

  const userData = await authService.verifyToken(req.headers.authorization);

  if (!userData) {
    return next();
  }

  const user = await usersService.findById(userData.id);

  if (!user) {
    return next();
  }

  req.headers.userId = String(user.id);

  next();
}

export async function authRequired(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.userId) {
    return res.status(401).send("Unauthorized request");
  }

  next();
}
