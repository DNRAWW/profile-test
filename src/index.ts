import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import { initRoutes } from "./routes";
import { dbConnection } from "./db/db-connection";
import { tryAuthenticateUser } from "./middleware/authMiddleware";

dotenv.config();

function main() {
  const app: Express = express();
  const port = process.env.PORT;

  app.use(urlencoded());
  app.use(express.json());
  app.use(tryAuthenticateUser);
  initRoutes(app, dbConnection);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();
