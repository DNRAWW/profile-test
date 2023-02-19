import { Express, Request, Response } from "express";
import { Knex } from "knex";
import { authRequired } from "./middleware/authMiddleware";
import { AuthService } from "./services/authService";
import { UsersService } from "./services/usersService";
import { idData, pageData } from "./validation/commonValidation";
import {
  loginData,
  registerData,
  updateData,
} from "./validation/userValidation";
import { promiseWrapper } from "./wrapper";

export function initRoutes(app: Express, dbConnection: Knex) {
  const usersService = new UsersService(dbConnection);
  const authService = new AuthService(dbConnection, usersService);

  app.post(
    "/user/register",
    promiseWrapper(async (req: Request, res: Response) => {
      const validatedUser = registerData.parse(req.body);

      const userWithEmail = await usersService.findByEmail(validatedUser.email);

      if (!userWithEmail) {
        await usersService.create(validatedUser);

        return res.send(true);
      }

      return res.status(400).send("User with this email already exists");
    })
  );

  app.post(
    "/user/login",
    promiseWrapper(async (req: Request, res: Response) => {
      const validatedLoginData = loginData.parse(req.body);
      const user = await authService.validateUser(
        validatedLoginData.email,
        validatedLoginData.password
      );

      if (!user) {
        return res.status(401).send("Wrong login or password");
      }

      return res.send(authService.genToken(user.id));
    })
  );

  app.put(
    "/profile",
    authRequired,
    promiseWrapper(async (req: Request, res: Response) => {
      const id = Number(req.headers.userId);
      const validatedUpdateData = updateData.parse(req.body);

      const userWithEmail = validatedUpdateData.email
        ? await usersService.findByEmail(validatedUpdateData.email)
        : false;

      if (!userWithEmail) {
        await usersService.update(id, validatedUpdateData);

        return res.send(true);
      }

      return res.status(400).send("User with this email already exists");
    })
  );

  app.get(
    "/profile/:id",
    promiseWrapper(async (req: Request, res: Response) => {
      const id = idData.parse(req.params).id;

      const user = await usersService.findById(id);

      if (user) {
        return res.json(user).send();
      }

      res.status(404).send("User not found");
    })
  );

  app.get(
    "/profiles",
    promiseWrapper(async (req: Request, res: Response) => {
      const page = pageData.parse(req.query).page;

      res.json(await usersService.findAll(page)).send();
    })
  );

  app.get(
    "/user/me",
    authRequired,
    promiseWrapper(async (req: Request, res: Response) => {
      const userId = Number(req.headers.userId);
      return res.json(await usersService.findById(userId)).send();
    })
  );
}
