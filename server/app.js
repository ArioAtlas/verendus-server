import Express from "express";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import xss from "xss-clean";
import cors from "cors";
import httpStatus from "http-status";
import compression from "compression";
import fileUpload from "express-fileupload";
import path from "path";
import morgan from "./config/morgan";
import routes from "./api/routes";
import config from "./config/config";
import { errorConverter, errorHandler } from "./api/middlewares/error";
import ApiError from "./api/utils/ApiError";

const app = new Express();

if (config.env !== "test") {
  app.use(morgan.successHandler);
  app.use(morgan.errorHandler);
}
console.log();
console.log(config.env);
// set security HTTP headers
app.use(helmet());

// parse json request body
app.use(Express.json());

// parse urlencoded request body
app.use(Express.urlencoded({ extended: true }));

// sanitize request data
app.use(xss());
app.use(mongoSanitize());

// gzip compression
app.use(compression());

// enable cors
app.use(cors());
app.options("*", cors());

// enable files upload
app.use(
  fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    debug: config.env !== "production",
  })
);

// Open API Specification
const apiSpec = path.join(__dirname, "./api/docs/api.yml");

app.use(process.env.OPENAPI_SPEC || "/spec", Express.static(apiSpec));

// api routes
app.use("/api", routes);

const root = path.normalize(`${__dirname}/..`);
app.use(Express.static(`${root}/public`));
app.use('/dashboard',Express.static(`${root}/public`));

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
  next(new ApiError(httpStatus.NOT_FOUND, "Not found"));
});

// convert error to ApiError, if needed
app.use(errorConverter);

// handle error
app.use(errorHandler);

export default app;
