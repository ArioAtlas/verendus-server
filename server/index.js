import mongoose from "mongoose";
import config from "./config/config";
import app from "./app";
import logger from "./config/logger";

const server = app.listen(config.port, () => {
  logger.info(`Listening to port ${config.port}`);

  mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
    logger.info("Connected to MongoDB");
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info("Server closed");
      // eslint-disable-next-line no-process-exit
      process.exit(1);
    });
  } else {
    // eslint-disable-next-line no-process-exit
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);

process.on("SIGTERM", () => {
  logger.info("SIGTERM received");
  if (server) {
    server.close();
  }
});

process.on("SIGHUP", () => {
  logger.info("SIGHUP received");
  if (server) {
    server.close();
  }
});

export default server;
