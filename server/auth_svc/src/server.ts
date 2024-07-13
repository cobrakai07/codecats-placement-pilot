// libs
import express, { Request, Response, NextFunction } from "express";
import http from "http";

// file's and utils.
import "./config/logging";
import { SERVER } from "./config/config";
import { loggingHandler } from "./middleware/logging.middleware";
import { corsHandler } from "./middleware/cors.middleware";
import { routeNotFound } from "./middleware/route.middleware";
import connect_db from "./config/db";
import appRouter from "./routes/user.route";
// initializing
export const application = express();
export let httpServer: ReturnType<typeof http.createServer>;

// main function to setup and start server.
export const main = () => {
  logging.info("--------------------------------------------");
  logging.info("Initializing API");
  logging.info("--------------------------------------------");
  // utilities
  application.use(express.urlencoded({ extended: true }));
  application.use(express.json());

  logging.info("--------------------------------------------");
  logging.info("Logging & Configuration");
  logging.info("--------------------------------------------");
  // middlewares
  application.use(loggingHandler);
  application.use(corsHandler);
  //  application.use(routeNotFound);

  logging.info("--------------------------------------------");
  logging.info("Define Controller Routing");
  logging.info("--------------------------------------------");
  // test route
  application.get(
    "/api/v1/test",
    (req: Request, res: Response, next: NextFunction) => {
      return res.status(200).json({ message: "Server is up and running." });
    }
  );
  application.use(appRouter);
  application.use(routeNotFound);

  logging.info("--------------------------------------------");
  logging.info("Connecting Database");
  logging.info("--------------------------------------------");
  connect_db();

  logging.info("--------------------------------------------");
  logging.info("Starting Server");
  logging.info("--------------------------------------------");
  httpServer = http.createServer(application);
  httpServer.listen(SERVER.SERVER_PORT, () => {
    logging.info("---------------------------------------------");
    logging.info(
      "Server Started: " + SERVER.SERVER_HOSTNAME + " : " + SERVER.SERVER_PORT
    );
    logging.info("---------------------------------------------");
  });
};
// simple shutdown function to stop server (mostly used by testin libs)
export const shutdown = (callback: any) =>
  httpServer && httpServer.close(callback);
// calling
main();
