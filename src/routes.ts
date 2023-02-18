import { Express } from "express";

export function initRoutes(app: Express) {
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
