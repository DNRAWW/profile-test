import express, { Express, urlencoded } from "express";
import dotenv from "dotenv";
import { initRoutes } from "./routes";
import { dbConnection } from "./db/db-connection";
import { tryAuthenticateUser } from "./middleware/authMiddleware";
import fileUpload from "express-fileupload";
import path from "path";

dotenv.config();

function main() {
  const app: Express = express();
  const port = process.env.PORT;

  app.use(urlencoded());
  app.use(
    fileUpload({
      createParentPath: true,
      limits: {
        files: 1,
        fileSize: 10485760,
      },
      preserveExtension: true,
      abortOnLimit: true,
    })
  );

  app.use(express.static(__dirname + "/public"));

  app.use(tryAuthenticateUser);
  initRoutes(app, dbConnection);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });
}

main();
