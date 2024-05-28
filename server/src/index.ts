import { config } from "dotenv";
import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router";

config({ path: `${__dirname}/.env` });

const app = express();
app.use(
  cors({
    credentials: true,
  })
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, () => {
  console.log(`server running`);
});

const MONGO_URL = process.env.CONNECTION_STRING;

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on("error", (err: Error) => {
  console.log("err: ", err);
});

app.use("/", router());
