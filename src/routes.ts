import { Express } from "express";
import { Knex } from "knex";
import { UsersService } from "./services/usersService";

export function initRoutes(app: Express, dbConnection: Knex) {
  const usersService = new UsersService(dbConnection);

  app.post("/user/register", (req, res) => {
    //
  });
  app.post("/user/login", (req, res) => {
    //
  });
  app.put("/profile/:id", (req, res) => {
    //
  });
  app.get("/profile/:id", (req, res) => {
    //
  });
  app.get("/profiles", (req, res) => {
    //
  });
}
