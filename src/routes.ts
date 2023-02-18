import { Express, Request, Response } from "express";
import { Knex } from "knex";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";
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
    })
  );

  app.put(
    "/profile/:id",
    promiseWrapper(async (req: Request, res: Response) => {
      const id = idData.parse(req.params).id;
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
        res.json(user);
        res.send();
        return;
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
}
