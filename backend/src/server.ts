import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import "express-async-errors";
import helmet from "helmet";
import StatusCodes from "http-status-codes";
import morgan from "morgan";
import BaseRouter from "routes/index";
import UserRouter from "routes/user";
import logger from "shared/Logger";
import cors from "cors";
import passport from "pre-start/passport/passport.init";

const app = express();

passport(app);

const { BAD_REQUEST } = StatusCodes;

/** **********************************************************************************
 *                              Set basic express settings
 * ********************************************************************************* */

const allowedOrigins = [
  "http://localhost:3001",
  "http://localhost:3000",
];

const options: cors.CorsOptions = {
  origin: allowedOrigins,
};

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

if (process.env.NODE_ENV === "production") {
  app.use(helmet());
}

app.use("/", BaseRouter);
app.use("/user", UserRouter);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.err(err, true);
  return res.status(BAD_REQUEST).json({
    error: err.message,
  });
});

export default app;
